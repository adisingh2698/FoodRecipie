export const apiUrls = {
  Authentication: {
    SignIn: 'auth/login',
    SignUp: 'auth/signup',
    findEmail: 'auth/findEmail',
    changepassword: 'auth/changepassword',
  },
  Business: {
    AddReceipesDetail: 'admin/AddReceipesDetail',
    UpdateReceipesDetail: 'admin/UpdateReceipesDetail',
    GetReceipesDetailList: 'admin/GetReceipesDetailList',
    DeleteReceipesDetailL: 'admin/DeleteReceipesDetailL',
  },
  Service: {
    AddProfile: 'user/AddProfile',
    UpdateProfile: 'user/UpdateProfile',
    GetProfile: 'user/GetProfile',

    GetReceipesDetailList: 'user/GetReceipesDetailList',
    GetReceipesByCategory: 'user/GetReceipesByCategory',
    GetReceipesByKeyword: 'user/GetReceipesByKeyword',

    AddUserReceipe: 'user/AddUserReceipe',
    UpdateUserReceipe: 'user/UpdateUserReceipe',
    GetUserReceipeList: 'user/GetUserReceipeList',
    DeleteUserReceipe: 'user/DeleteUserReceipe',

    AddUserReview: 'user/AddUserReview',
    UpdateUserReview: 'user/UpdateUserReview',
    GetUserReviewList: 'user/GetUserReviewList',
    DeleteUserReview: 'user/DeleteUserReview',
  },
};
