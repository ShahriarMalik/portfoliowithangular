export interface StyleConfig {
  selector: string;
  styles: {
    mobile?: { [key: string]: string };
    tablet?: { [key: string]: string };
    desktop?: { [key: string]: string };
  };
}
