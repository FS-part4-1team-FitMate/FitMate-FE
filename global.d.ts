declare namespace daum {
    class Postcode {
        constructor(options: {
            oncomplete: (data: any) => void;
        });
        open(): void;
    }
}