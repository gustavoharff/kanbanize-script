export interface KanbanizeRoot {
  pagination: Pagination
  data: LoggedTime[]
}

export interface Pagination {
  all_pages: number
  current_page: number
  results_per_page: number
}

export interface LoggedTime {
  logged_time_id: number
  parent_card_id: any
  card_id: number
  subtask_id: any
  lane_id: number
  column_id: number
  user_id: number
  category_id: number
  date: string
  time: number
  comment: string
  logged_at: string
}
