import { Moment } from 'moment';

export interface ToDo {
  id: number,
  text?: string,
  finished?: boolean,
  dateCreated?: Moment,
  dateFinished?: Moment,
}
