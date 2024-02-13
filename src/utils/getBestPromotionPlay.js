import { promotionUrl } from "../apis/apiURLs";

export default async function getBestPromotionPlay() {
  try {
    let newList = [];
    // 소규모 연극 조회순 top 5
    const res_views = await fetch(`${promotionUrl}?limit=5&sortBy=views&sortOrder=desc&category=연극`);
    const data_views = await res_views.json();
    if (res_views.ok) {
      newList = data_views.promotions;
    }

    // 소규모 연극 추천순 top 5
    const res_likes = await fetch(`${promotionUrl}?limit=5&sortBy=likes&sortOrder=desc&category=연극`);
    const data_likes = await res_likes.json();
    if (res_likes.ok) {
      newList = [...newList, ...data_likes.promotions];
    }

    newList = newList.reduce(function (newArr, current) {
      if (newArr.findIndex(({ _id }) => _id === current._id) === -1) {
        newArr.push(current);
      }
      return newArr;
    }, []);

    // 조회수, 추천 둘 다 없으면 제거
    newList = newList.filter((promotion) => promotion.likes + promotion.views > 0);

    // (조회수 + 추천수) 높은 순 정렬
    newList.sort((a, b) => b.views + b.likes - (a.views + a.likes));

    return newList;
  } catch (e) {
    console.error(e);
  }
}
