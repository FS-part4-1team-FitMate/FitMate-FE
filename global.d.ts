declare namespace daum {
  class Postcode {
    constructor(options: { oncomplete: (data: any) => void });
    open(): void;
  }
}

export declare global {
  interface Window {
    Kakao: any;
  }
}
