import "./PlaySearchResult.scss";
import PlaySearchHeader from "./PlaySearchHeader";
import PlaySearchContentBox from "./PlaySearchContentBox";
import PlaySearchPagination from "./PlaySearchPagination";

export default function PlaySearchResult({
  playSearchResult,
  setPlaySearchResult,
  curPage,
  setCurPage,
  playTotalCnt,
  searchKeyword,
  setAlert,
  setSortStandard,
}) {
  return (
    <>
      {playSearchResult.length ? (
        <>
          <section className="play-search-result-container">
            <PlaySearchHeader
              setSortStandard={setSortStandard}
              setCurPage={setCurPage}
            />
            <div className="play-search-content">
              {playSearchResult.map((play, idx) => (
                <PlaySearchContentBox
                  showId={play.showId}
                  imgSrc={play.poster}
                  location={play.location}
                  title={play.title}
                  startDate={play.start_date}
                  endDate={play.end_date}
                  price={play.price}
                  state={play.state}
                  key={idx}
                />
              ))}
            </div>
          </section>
          <PlaySearchPagination
            curPage={curPage}
            setCurPage={setCurPage}
            playTotalCnt={playTotalCnt}
            keyword={searchKeyword}
            setPlaySearchResult={setPlaySearchResult}
            setAlert={setAlert}
          />
        </>
      ) : (
        <div className="play-search-result-none">
          <h2>검색어에 해당하는 연극이 존재하지 않습니다.</h2>
          <ul>
            <li>단어의 철자가 정확한지 확인해보세요.</li>
            <li>한글을 영어로, 영어를 한글로 입력했는지 확인해보세요.</li>
            <li>정확한 연극명을 모를 경우, 연극명 일부만으로 검색해보세요.</li>
          </ul>
        </div>
      )}
    </>
  );
}
