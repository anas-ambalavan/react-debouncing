import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";

function Debouncing() {
  const [text, setText] = useState("");
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const inputHandler = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    let timer;
    if (text) {
      timer = setTimeout(() => {
        const filteredData = data.filter((item) => {
          return item.title.includes(text);
        });
        console.log(filteredData);
        setFilteredData(filteredData);
      }, 500);
    } else {
      setFilteredData(data);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  useEffect(() => {
    // console.log("USE Effect running");
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://jsonplaceholder.typicode.com/posts", { signal: signal })
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        return json;
      })
      .then((json) => setFilteredData(json));

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>React Deboucing</h1>
        <input
          type="text"
          value={text}
          onChange={inputHandler}
          placeholder="Search with title"
          style={{
            height: 50,
            borderRadius: 15,
            paddingLeft: 10,
            width: "60%",
            fontSize: 20,
          }}
        />
        <h4>
          {" "}
          <span style={{ color: "blue" }}>{filteredData?.length}</span> Posts
        </h4>
      </div>
      <div style={{ marginTop: 10, padding: 50 }}>
        {filteredData
          ? filteredData.map((item, i) => (
              <ListItem key={i} title={item.title} body={item.body} />
            ))
          : "No data found"}
      </div>
    </>
  );
}

export default Debouncing;
