import '../sass/index';
import creatPost from "./utils/creatPost";
import { infiniteScroll, sortPosts } from "./utils";

let currentPage = 1;
const posts = sortPosts(window.database.posts);
creatPost('.posts', currentPage++, posts);
infiniteScroll(() => {
    creatPost('.posts', currentPage++, posts);
});