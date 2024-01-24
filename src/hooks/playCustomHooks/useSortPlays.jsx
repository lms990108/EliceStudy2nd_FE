// 연극 정렬 함수
export default function useSortPlays(sortStandard, setPlays) {
  switch (sortStandard) {
    // 최신순으로 정렬
    case "new":
      setPlays((pre) => {
        const newPlays = [...pre];
        newPlays.sort((play1, play2) => {
          // 최신순을 비교할 두 연극을 1970년 1월 1일로부터 경과한 시간(ms 단위)으로 바꾸어 더 많이 경과한 연극이 앞 순서에 위치할 수 있도록 하기
          const play1MS = new Date(play1.start_date).getTime();
          const play2MS = new Date(play2.start_date).getTime();
          return play2MS - play1MS;
        });
        return newPlays;
      });
      break;
    // 낮은 가격 순으로 정렬
    case "cheap":
      setPlays((pre) => {
        const newPlays = [...pre];
        newPlays.sort((play1, play2) => {
          // 가격이 전석 가격이 아닐 경우 최저 가격으로 비교하기
          const getAveragePrice = (price) => {
            const regex = /[^0-9]/g;

            if (price.includes(", ")) {
              const splitPrice = price.split(", ").map((price) => {
                // 숫자가 아닌 것들을 모두 찾아 빈 문자열로 대체하는 로직
                const regex = /[^0-9]/g;
                if (price.includes("층")) {
                  price = price.replace(regex, "");
                  price = price.substr(1);
                }
                price = price.replace(regex, "");
                return parseInt(price);
              });
              // 최저 가격 구하기
              const lowestPrice = Math.min(...splitPrice);
              return lowestPrice;
              // 가격이 전석 무료일 경우 가격은 0이 됨.
            } else if (price.includes("무료")) {
              return 0;
            }

            // 전석 가격일 경우 그냥 그 가격에서 숫자만 반환
            price = parseInt(price.replace(regex, ""));
            return price;
          };

          const play1Price = getAveragePrice(play1.price);
          const play2Price = getAveragePrice(play2.price);

          return play1Price - play2Price;
        });
        return newPlays;
      });
      break;
    // 종료 임박순으로 정렬 (이 부분은 나중에 실제 api 연결 후 잘 돌아가는지 확인하기)
    case "near-end":
      setPlays((prevPlays) => {
        const currentDate = new Date().getTime();

        // 이미 끝난 연극과 끝나지 않은 연극을 나누기
        const filterEndPlays = prevPlays.filter(
          (play) => new Date(play.end_date).getTime() < currentDate
        );
        const filterNotEndPlays = prevPlays.filter(
          (play) => new Date(play.end_date).getTime() >= currentDate
        );

        // 끝나지 않은 연극을 종료 임박순으로 정렬
        filterNotEndPlays.sort((play1, play2) => {
          const play1MSGap = new Date(play1.end_date).getTime() - currentDate;
          const play2MSGap = new Date(play2.end_date).getTime() - currentDate;
          return play1MSGap - play2MSGap;
        });

        // 이미 끝난 연극과 끝나지 않은 연극을 합치고 상태로 설정
        const sortedPlays = [...filterNotEndPlays, ...filterEndPlays];
        return sortedPlays;
      });
      break;
    // 높은 평점순으로 정렬
    case "popular":
      break;
    default:
      break;
  }
}
