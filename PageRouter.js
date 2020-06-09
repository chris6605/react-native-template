import HomeIndexPage from './src/pages/home/HomeIndexPage.js';
import LoginPage from './src/pages/home/LoginPage.js';
import SplashPage from './src/pages/home/SplashPage.js';
import WebPage from './src/pages/home/WebPage.js';
import InformationDetailPage from './src/pages/information/InformationDetailPage.js';
import InformationIndexPage from './src/pages/information/InformationIndexPage.js';
import NoticeDetailPage from './src/pages/information/NoticeDetailPage.js';
import MineIndexPage from './src/pages/mine/MineIndexPage.js';
import ShopIndexPage from './src/pages/shop/ShopIndexPage.js';


const PAGES = [{ name: 'HomeIndexPage', page: HomeIndexPage },
{ name: 'LoginPage', page: LoginPage },
{ name: 'SplashPage', page: SplashPage },
{ name: 'WebPage', page: WebPage },
{ name: 'InformationDetailPage', page: InformationDetailPage },
{ name: 'InformationIndexPage', page: InformationIndexPage },
{ name: 'NoticeDetailPage', page: NoticeDetailPage },
{ name: 'MineIndexPage', page: MineIndexPage },
{ name: 'ShopIndexPage', page: ShopIndexPage }
]
class PageRouter {
static HomeIndexPage = 'HomeIndexPage';
static LoginPage = 'LoginPage';
static SplashPage = 'SplashPage';
static WebPage = 'WebPage';
static InformationDetailPage = 'InformationDetailPage';
static InformationIndexPage = 'InformationIndexPage';
static NoticeDetailPage = 'NoticeDetailPage';
static MineIndexPage = 'MineIndexPage';
static ShopIndexPage = 'ShopIndexPage';
}

export {
    PageRouter,
    PAGES
};