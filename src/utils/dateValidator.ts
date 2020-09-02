import { Validator } from '../presentation/protocols'
import moment from 'moment'

export class DateValidator implements Validator {

  isValid (data: any): boolean {
    const { initialDate, finalDate } = this.format(data)
    
    if (initialDate === 'Invalid date') return false
    else if (finalDate === 'Invalid date') return false
    else if (!moment(initialDate).isBefore(finalDate)) return false
    
    return true
  }

  format (data: any): any {
    const initialDate = moment(data.initialDate).format('YYYY-MM-DD')
    const finalDate = moment(data.finalDate).format('YYYY-MM-DD')

    return {
      initialDate,
      finalDate
    }
  }
}
