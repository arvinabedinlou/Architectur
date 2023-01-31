export default class AppStorage {
  private static _instance?: AppStorage;

  token: string = "x";

  user: string = "y";

  userToken: string = "z";

  private constructor() {
    if (AppStorage._instance) {
      throw new Error("Use AppStorage.instance instead of new");
    }
    AppStorage._instance = this;
  }

  static get instance() {
    return AppStorage._instance ?? (AppStorage._instance = new AppStorage());
  }

  //   setUser() {
  //     localStorage.setItem(this.token, loginModel.token);
  //     localStorage.setItem(this.user, JSON.stringify(loginModel.user));
  //   }

  getUserToken(): string | null {
    return localStorage.getItem(this.token);
  }

  getUserToken3(): any {
    let user: any = null;
    try {
      user =
        localStorage.getItem(this.userToken) != null
          ? localStorage.getItem(this.userToken)
          : null;
    } catch (error) {
      console.log(">>>>: src/helpers/Utils.js  : getUserToken -> error", error);
      user = null;
    }
    return JSON.parse(user);
  }

  //   getUser(): UserModel | null {
  //     return JSON.parse(localStorage.getItem(this.user)!);
  //   }

  logout(): void {
    localStorage.removeItem(this.token);
    localStorage.removeItem(this.user);
  }

  isLogin(): boolean {
    if (this.getUserToken()) {
      return true;
    }
    return false;
  }
}
// export const getUserToken: any = (): string | null => {
//   let user = null;
//   try {
//     user =
//       localStorage.getItem("userToken") != null
//         ? JSON.parse(localStorage.getItem("userToken"))
//         : null;
//   } catch (error) {
//     console.log(">>>>: src/helpers/Utils.js  : getUserToken -> error", error);
//     user = null;
//     return null;
//   }
//   return user;
// };
