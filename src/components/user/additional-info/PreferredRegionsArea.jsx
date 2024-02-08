import "./PreferredRegionsArea.scss";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

export default function PreferredRegionsArea({
  selectedRegion,
  setSelectedRegion,
}) {
  return (
    <div className="preferred-regions-area">
      <h2>선호 지역</h2>
      <div className="region-check-list">
        <FormControl required component="fieldset" variant="standard">
          <FormGroup
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {[
              "서울",
              "경기/인천",
              "대전/충청",
              "강원",
              "부산/울산",
              "대구/경상",
              "광주/전라",
              "제주",
            ].map((region, idx) => (
              <FormControlLabel
                control={
                  <Checkbox
                    name={region}
                    checked={region === selectedRegion}
                    onClick={() => setSelectedRegion(region)}
                    color="secondary"
                    key={idx}
                  />
                }
                sx={{ marginRight: "50px" }}
                label={region}
              />
            ))}
          </FormGroup>
          <FormHelperText sx={{ fontSize: "15px" }}>
            1개의 선호 지역을 고른 후 제출해 주세요.
          </FormHelperText>
        </FormControl>
      </div>
    </div>
  );
}
