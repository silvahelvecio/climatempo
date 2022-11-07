
export class AuthOutput {
  public authenticated: boolean;
  public userName: string;
  public expiration: Date;
  public accessToken: string;
  public message: string;
  public erro: string;
  public refreshToken: string;

}
