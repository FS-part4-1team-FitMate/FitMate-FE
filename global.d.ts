declare namespace daum {
  class Postcode {
    constructor(options: { oncomplete: (data: any) => void });
    public open: () => void;
  }
}

export declare global {
  interface Window {
    Kakao: any;
    daum: {
      Postcode: new (options: { oncomplete: (data: any) => void }) => {
        open(): void;
      };
    };
  }
}

export {};
