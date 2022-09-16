import { useEffect, useState } from "react";
import "./ListOfUsersStyle.scss";
import axios from "axios";
import { CreateUsers } from "./CreateUsers/CreateUsers";
import imgSearch from "../../images/search1.png";
import imgVector from "../../images/free-icon-font-caret-down-3916922.png";

export function ListOfUsers() {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [ascii, setAscii] = useState("ASC");
  const [active, setActive] = useState(false);
  useEffect(() => {
    axios
      .get("https://oril-coins-test.herokuapp.com/list")
      .then((res) => setData(res.data));
  }, []);
  const searchInput = (e) => {
    setSearchData(e.target.value);
  };
  const searchName = data.filter((user) => {
    return user.name.toLowerCase().includes(searchData.toLowerCase());
  });
  const sort = (value) => {
    if (ascii === "ASC") {
      const sorted = data.sort((a, b) => (a[value] < b[value] ? -1 : 1));
      setActive(true);
      setData(sorted);
      setAscii("DSC");
    }
    if (ascii === "DSC") {
      const sorted = data.sort((a, b) => (a[value] > b[value] ? -1 : 1));
      setActive(false);
      setData(sorted);
      setAscii("ASC");
    }
  };
  return (
    <div className="main-box">
      <div>
        <input className="search" placeholder="Search" onChange={searchInput} />
        <img src={imgSearch} alt="search" className="search-icon" />
      </div>
      <table className="container-users">
        <tr className="row">
          <th className="name-title header_sort" onClick={() => sort("name")}>
            Name
          </th>
          {active ? (
            <img src={imgVector} alt="img_vector" className="vector-icon" />
          ) : (
            <img
              src={imgVector}
              alt="img_vector"
              className="vector-icon-active"
            />
          )}
          <th className="date" onClick={() => sort("date")}>
            Date
          </th>
          <th className="empty"></th>
          <th className="state header_sort" onClick={() => sort("isActive")}>
            State
          </th>
        </tr>
        {searchName.map((user) => (
          <CreateUsers key={user.id} user={user} />
        ))}
      </table>
    </div>
  );
}
