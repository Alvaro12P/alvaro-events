type UpdateData = {
  id?: number
  price?: number
  address?: string
  deposit?: boolean
  date?: string
  startTime?: string
  endTime?: string
  km?: number
}

type CreateData = {
  idClient: number
  address: string
  price: number
  date: string
  startTime: string
  endTime: string
  deposit: boolean
  km: number
}

export class EventsTools {
  private static async handleResponse(r: Response) {
    if (r.status === 200) return { error: false, data: await r.json() }
    else return { error: true, message: await r.text() }
  }

  public static async update(id: number, data: UpdateData) {
    return fetch(`/api/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }).then(this.handleResponse)
  }

  public static async create(data: CreateData) {
    return fetch(`/api/events`, {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(this.handleResponse)
  }
}
