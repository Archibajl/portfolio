class Base {
  constructor() {
    this.intro = {
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

export default Base;
