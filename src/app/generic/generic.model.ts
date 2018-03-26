/**
 * Instance's information. This model is to describe the column name, type and display order of piece of data.
 * type should be either (in string format): photo, text, date
 */
export class ModelConfig {
  public displayName?: string;
  public type?: string;
  public readOnly?: boolean;
  public displayOrder?: number;
}

export class GenericModuleConfig {
  public isAuth: boolean;
  public moduleName: string;
  public path?: string;
  public pageTitle?: string;
  public model: { [key: string]: ModelConfig };
}
