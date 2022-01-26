import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    boxColor: string;
    bgColor: string;
    accentColor: string;
  }
}