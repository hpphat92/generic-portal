import * as _config from '../config.json';
import { GenericModuleConfig } from './generic/generic.model';

let config = (_config as any);
export default class AppConstant {
  //    "domain": "http://genericportalbackend.azurewebsites.net",
  // public static domain = 'https://trabbletestapp.azurewebsites.net';
  // public static domain = '';
  public static domain = config.site.domain;
}

export class Permission {
  public static ListNotes = 1;
  public static CreateNote = 2;
  public static EditNote = 3;
  public static DetailNote = 4;
  public static DeleteNote = 5;
  public static ListApp = 6;
  public static CreateApp = 7;
  public static EditApp = 8;
  public static DetailApp = 9;
  public static DeleteApp = 10;
}

export class RegularExpression {
  public static password = /^(?=.*[a-z|A-Z])(?=.*[A-Z])(?=.*\d).{8,}$/;
}

export const moduleConfig: GenericModuleConfig[] = [
  {
    isAuth: true,
    moduleName: 'place',
    pageTitle: 'Places',
    path: 'sample-places',
    model: {
      'Name': {
      },
    }
  },
  {
    isAuth: true,
    moduleName: 'item',
    pageTitle: 'Items',
    model: {
      'text': {
        displayName: 'Name',
        type: 'text',
        readOnly: false,
        displayOrder: 1
      },
      'description': {
        displayName: 'Description',
        type: 'text',
        readOnly: false,
        displayOrder: 2
      },
      'createdAt': {
        displayName: 'Created On',
        type: 'date',
        readOnly: true,
        displayOrder: 3
      },
      'updatedAt': {
        displayName: 'Last Updated',
        type: 'date',
        readOnly: true,
        displayOrder: 4
      },
    },
  }
];

