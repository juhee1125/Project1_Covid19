// CovidWorld.js
import React, { useRef, useState } from "react";
import Search from "./Search";
import SelectedItem from "./select";
import Nav from '../../navigation/Nav'
import Graph from "./Graph";
import CovidWorldCss from './CovidWorld.module.css'
// import CheckboxHandler from "./CheckboxHandler"; // Import the CheckboxHandler component

function CovidWorld() {
  const checkedRef = useRef(null);
  const checkAllRef = useRef(null);
  const checkboxesRef = useRef({});
  const resultRef = useRef([]);
  const [selected, setSelected] = useState([]);
  const data =
[
  {
    "id": "japan",
    "color": "hsl(305, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 155
      },
      {
        "x": "helicopter",
        "y": 171
      },
      {
        "x": "boat",
        "y": 135
      },
      {
        "x": "train",
        "y": 266
      },
      {
        "x": "subway",
        "y": 202
      },
      {
        "x": "bus",
        "y": 189
      },
      {
        "x": "car",
        "y": 242
      },
      {
        "x": "moto",
        "y": 48
      },
      {
        "x": "bicycle",
        "y": 252
      },
      {
        "x": "horse",
        "y": 284
      },
      {
        "x": "skateboard",
        "y": 142
      },
      {
        "x": "others",
        "y": 108
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(213, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 169
      },
      {
        "x": "helicopter",
        "y": 183
      },
      {
        "x": "boat",
        "y": 164
      },
      {
        "x": "train",
        "y": 175
      },
      {
        "x": "subway",
        "y": 18
      },
      {
        "x": "bus",
        "y": 202
      },
      {
        "x": "car",
        "y": 45
      },
      {
        "x": "moto",
        "y": 226
      },
      {
        "x": "bicycle",
        "y": 140
      },
      {
        "x": "horse",
        "y": 165
      },
      {
        "x": "skateboard",
        "y": 47
      },
      {
        "x": "others",
        "y": 24
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(41, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 294
      },
      {
        "x": "helicopter",
        "y": 40
      },
      {
        "x": "boat",
        "y": 14
      },
      {
        "x": "train",
        "y": 46
      },
      {
        "x": "subway",
        "y": 234
      },
      {
        "x": "bus",
        "y": 125
      },
      {
        "x": "car",
        "y": 37
      },
      {
        "x": "moto",
        "y": 291
      },
      {
        "x": "bicycle",
        "y": 52
      },
      {
        "x": "horse",
        "y": 109
      },
      {
        "x": "skateboard",
        "y": 4
      },
      {
        "x": "others",
        "y": 150
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(53, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 274
      },
      {
        "x": "helicopter",
        "y": 278
      },
      {
        "x": "boat",
        "y": 4
      },
      {
        "x": "train",
        "y": 66
      },
      {
        "x": "subway",
        "y": 124
      },
      {
        "x": "bus",
        "y": 80
      },
      {
        "x": "car",
        "y": 185
      },
      {
        "x": "moto",
        "y": 172
      },
      {
        "x": "bicycle",
        "y": 127
      },
      {
        "x": "horse",
        "y": 161
      },
      {
        "x": "skateboard",
        "y": 243
      },
      {
        "x": "others",
        "y": 203
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(203, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 6
      },
      {
        "x": "helicopter",
        "y": 225
      },
      {
        "x": "boat",
        "y": 2
      },
      {
        "x": "train",
        "y": 193
      },
      {
        "x": "subway",
        "y": 146
      },
      {
        "x": "bus",
        "y": 9
      },
      {
        "x": "car",
        "y": 245
      },
      {
        "x": "moto",
        "y": 28
      },
      {
        "x": "bicycle",
        "y": 160
      },
      {
        "x": "horse",
        "y": 112
      },
      {
        "x": "skateboard",
        "y": 75
      },
      {
        "x": "others",
        "y": 17
      }
    ]
  }
]

  const checkedNum = (checkedArr) => {
    setSelected(checkedArr);
  };

  const checkedAll = () => {
    const check = [...checkedRef.current.children];

    for (let i = 0; i < check.length; i++) {
      check[i].children[0].checked = checkAllRef.current.checked;
    }
  };

  const checkedCheck = () => {
    const checkboxes = Object.values(checkboxesRef);
    const checked = checkboxes.filter((checkbox) => checkbox.checked);
    if (Object.values(checkboxes).length === checked.length) {
      checkAllRef.current.checked = true;
    } else {
      checkAllRef.current.checked = false;
    }
  };

  return (
    <div className={CovidWorldCss.App}>
      <Nav/>
      <Search
        checkedRef={checkedRef}
        checkAllRef={checkAllRef}
        checkedAll={checkedAll}
        checkedNum={checkedNum}
        checkedCheck={checkedCheck}
        checkboxesRef={checkboxesRef}
      />
      <SelectedItem
        selected={selected}
        setSelected={setSelected}
        resultRef={resultRef}
      />
      <div style={{height:'600px', width:'900px'}}>
        <Graph data={data}/>
      </div>
    </div>
  );
}

export default CovidWorld;
