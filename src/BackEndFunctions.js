class Base {
  constructor() {
    let intro = {
      page: Boolean(true),
      get IntroPage() {
        return this.page;
      },
      set IntroPage(value) {
        this.page = !this.page;
      },
    };
  }
}
