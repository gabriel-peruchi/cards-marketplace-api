type CreatePageProps<T> = {
  list: T[]
  rpp: number
  page: number
}

type RestorePageProps<T> = {
  list: T[]
  rpp: number
  page: number
  more: boolean
}

export class Page<T> {
  list?: T[]
  rpp?: number
  page?: number
  more?: boolean

  static create<T>({ page, rpp, list }: CreatePageProps<T>) {
    const pagination = new Page<T>()

    if (rpp > 0) {
      pagination.rpp = rpp
      pagination.more = list.length === rpp + 1

      if (rpp + 1 === list.length) {
        list.pop()
      }
    } else {
      pagination.rpp = list.length
      pagination.more = false
    }

    pagination.page = page
    pagination.list = list

    return pagination
  }
}
