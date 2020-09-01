import { Validator } from '../presentation/protocols'
import moment from 'moment'

export class DateValidator implements Validator {

  isValid (data: any): boolean {
    const initialDate = moment(data.initialDate).format('YYYY-MM-DD')
    const finalDate = moment(data.finalDate).format('YYYY-MM-DD')
    console.log(initialDate)
    console.log(finalDate)
    console.log(moment(initialDate).isBefore(finalDate))
    if (initialDate === 'Invalid date') return false
    else if (finalDate === 'Invalid date') return false
    else if (!moment(initialDate).isBefore(finalDate)) return false
    
    return true
  }
}