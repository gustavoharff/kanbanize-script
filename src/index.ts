import axios from "axios";
import fs from "fs";
import "dotenv/config";
import { Root } from "./types";
import dayjs, { Dayjs } from "dayjs";
import { KanbanizeRoot } from "./types/kanbanize";
import prettier from "prettier";
import {
  secondsToTime,
  decimalToTime,
  secondsToMinutes,
  decimalToMinutes,
} from "./utils/time";
import path from "path";

async function getPonto() {
  const Authorization = `Bearer ${process.env.PONTO_TOKEN}`;

  const mes = dayjs(process.env.PONTO_MES, "YYYY-MM");
  const dataInicio = mes.startOf("month").format("YYYY-MM-DDT00:00:00");
  const dataFim = mes.endOf("month").format("YYYY-MM-DDT23:59:59");

  const client = axios.create({ baseURL: process.env.PONTO_BASE_URL });

  const response = await client.get<Root>("/core/ponto/buscar-espelho-ponto", {
    params: {
      matricula: process.env.PONTO_MATRICULA,
      dataInicio,
      dataFim,
    },
    headers: {
      Authorization,
    },
  });

  return response.data;
}

async function getKanbanize(params: { from_date: Dayjs; to_date: Dayjs }) {
  const client = axios.create({ baseURL: process.env.KANBANIZE_BASE_URL });

  const response = await client.get<KanbanizeRoot>("/v2/loggedTime", {
    params: {
      user_ids: process.env.KANBANIZE_USER_ID,
      from_date: params.from_date.format("YYYY-MM-DD"),
      to_date: params.to_date.format("YYYY-MM-DD"),
    },
    headers: {
      apikey: process.env.KANBANIZE_API_KEY,
    },
  });

  return response.data;
}

async function main() {
  const ponto = await getPonto();

  const initialDate = dayjs(ponto.registrosPonto[0].data);
  const finalDate = dayjs(
    ponto.registrosPonto[ponto.registrosPonto.length - 1].data
  );

  const kanbanizeResponse = await getKanbanize({
    from_date: initialDate,
    to_date: finalDate,
  });

  const content = [
    "# Horas Trabalhadas - Ponto vs Kanbanize",
    "",
    "| Data | Horas Ponto | Horas Kanbanize | Diferença em minutos |",
    "|------|-------------|-----------------|----------------------|",
  ];

  for (const registro of ponto.registrosPonto) {
    const kanbanizeSeconds = kanbanizeResponse.data.reduce(
      (acc, loggedTime) => {
        if (dayjs(loggedTime.date).isSame(dayjs(registro.data), "day")) {
          return acc + loggedTime.time;
        }
        return acc;
      },
      0
    );
    const kanbanizeMinutes = secondsToMinutes(kanbanizeSeconds);
    const pontoMinutes = decimalToMinutes(registro.fechamentoDiario);
    const diff = kanbanizeMinutes - pontoMinutes;

    content.push(
      `| ${registro.data} | ${decimalToTime(registro.fechamentoDiario)} | ${secondsToTime(kanbanizeSeconds)} | ${diff} |`
    );
  }

  const folder = path.join(__dirname, "..", "dist");

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  const file = path.join(folder, "result.md");

  const prettyContent = await prettier.format(content.join("\n"), {
    parser: "markdown",
  });

  fs.writeFileSync(file, prettyContent, "utf-8");
}

main();
