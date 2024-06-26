import logo from './logo.svg';
import './App.css';

import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ReactDOM from "react-dom";
import Graph from "react-vis-network-graph";
import Tooltip from '@mui/material/Tooltip';
import { type } from '@testing-library/user-event/dist/type';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import { FixedSizeList } from 'react-window';

function CodeInputer({ code, setcode }) {

  const handleChange = (event) => {
    setcode(event.target.value);
  };

  return (
    <div className="code-inputer">
      <TextField
        id="code inputer"
        label="input your code here"
        multiline
        rows={10}
        onChange={handleChange}
        value={code}
      />
    </div>
  );
}
function SignTableShower({ signtable, handleClickOpen }) {

  return (
    <div className="token-shower">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Tooltip title="点击查看字符串表" placement="top">
                  <span onClick={handleClickOpen}>
                    namestart
                  </span>
                </Tooltip>
              </TableCell>
              <TableCell>namelen</TableCell>
              <TableCell>name</TableCell>
              <TableCell>kind</TableCell>
              <TableCell>value</TableCell>
              <TableCell>type</TableCell>
              <TableCell>addr</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(signtable).map((item) => (
              <TableRow key={item[0]}>
                <TableCell component="th" scope="row">
                  {item[1].namestart}
                </TableCell>
                <TableCell>{item[1].namelen}</TableCell>
                <TableCell>{item[0]}</TableCell>
                <TableCell>{item[1].kind}</TableCell>
                <TableCell>{item[1].value}</TableCell>
                <TableCell>{item[1].type}</TableCell>
                <TableCell>{item[1].addr}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );


}
function TokenShower({ signtable, Tokentext, settokentext }) {
  let data = '';
  signtable.forEach((item) => {
    data += `<${item.kind}, ${item.value}>\n`;
  });

  settokentext(data);


  return (
    <div className="code-inputer">
      <TextField
        id="token shower"
        label="Token"
        multiline
        rows={10}
        value={data}
        readOnly
      />
    </div>
  );
}

function StringTableShower(props) {
  const { onClose, open, stringtable } = props;

  const handleClose = () => {
    onClose();
  };

  function renderRow(props) {
    const { index, style } = props;

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={`${index} : ${stringtable[index]}`} primaryTypographyProps={{ align: 'center' }} />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle style={{ textAlign: 'center' }}>String Table</DialogTitle>
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={stringtable.length}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Dialog >
  );
}



function startlexicalanalysis(code, addsign, setchartable, setstringtable) {
  //1:keyword 2:id 3:digit 4:operator 5:delimiter
  const predata = [];
  const chartable = new Map();
  const stringtable = [];

  function addData(name, kind, value) {
    let kind2 = '';
    switch (kind) {
      case 1:
        kind = 'KEYWORD';
        break;
      case 2:
        kind = 'IDENTIFIER';
        break;
      case 3:
        kind = 'CONSTANT';
        break;
      case 4:
        kind = 'OPERATOR';
        break;
      case 5:
        kind = 'DELIMITER';
        break;
    }
    predata.push({ name, kind, value });
  }

  function ifblank(c) {
    return c === ' ' || c === '\n' || c === '\t' || c === '\r';
  }

  function ifdelimiter(c) {
    return c === '(' || c === ')' || c === ';' || c === '\'';
  }


  function ifdigit(c) {
    return c >= '0' && c <= '9';
  }

  function ifletter(c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_';
  }

  function addid(s) {
    if (chartable.has(s)) {
      //addData(s, chartable.get(s).kind, chartable.get(s).value);
    } else {
      addData(s, 2, s);//add to token           
      chartable.set(s, { kind: "-", value: "-", type: "-", namestart: stringtable.length, namelen: s.length, addr: "-" });//add to signtable
      s.split('').forEach((item) => {
        stringtable.push(item);
      });
    }
  }

  function finalprocess() {
    addsign(predata);
    setchartable(chartable);
    setstringtable(stringtable);
  }

  chartable.set("if", { kind: "KEYWORD", value: "if", type: "-", namestart: "-", namelen: "-", addr: "-" });
  chartable.set("else", { kind: "KEYWORD", value: "else", type: "-", namestart: "-", namelen: "-", addr: "-" });
  chartable.set("while", { kind: "KEYWORD", value: "while", type: "-", namestart: "-", namelen: "-", addr: "-" });
  chartable.set("int", { kind: "KEYWORD", value: "int", type: "-", namestart: "-", namelen: "-", addr: "-" });
  chartable.set("float", { kind: "KEYWORD", value: "float", type: "-", namestart: "-", namelen: "-", addr: "-" });

  let pointer = 0;
  while (true) {
    if (pointer >= code.length) {
      finalprocess();
      return;
    }
    while (ifblank(code[pointer])) {
      pointer++;
      if (pointer >= code.length) {
        finalprocess();
        return;
      }
    }

    //digits
    if (ifdigit(code[pointer])) {
      let value = 0;
      while (ifdigit(code[pointer])) {

        value = value * 10 + code.charCodeAt(pointer) - 48;
        pointer++;
        if (pointer >= code.length) {
          addData(value, "CONSTANT", value);
          finalprocess();
          return;
        }
      }
      addData(value, "CONSTANT", value);
      continue;
    }

    //letters and keywords
    if (ifletter(code[pointer])) {
      let b = "";
      while (ifletter(code[pointer])) {
        b += code[pointer];
        pointer++;
        if (pointer >= code.length) {
          addid(b);
          finalprocess();
          return;
        }
      }
      addid(b);
      continue;
    }

    //dilimiters
    if (ifdelimiter(code[pointer])) {
      addData(code[pointer], "DELIMITER", code[pointer]);
      pointer++;
      if (pointer >= code.length) {
        finalprocess();
        return;
      }
      continue;
    }

    //operators
    let state = 0;
    let flag = true;
    while (flag) {
      switch (state) {
        case 0:
          if (code[pointer] == '+') {
            addData("+", "OPERATOR", "+");
            pointer++;
            if (pointer >= code.length) {
              finalprocess();
              return;
            }
            flag = false;
            break;
          }

          if (code[pointer] == '-') {
            addData("-", "OPERATOR", "-");
            pointer++;
            if (pointer >= code.length) {
              finalprocess();
              return;
            }
            flag = false;
            break;
          }

          if (code[pointer] == '*') {
            addData("*", "OPERATOR", "*");
            pointer++;
            if (pointer >= code.length) {
              finalprocess();
              return;
            }
            flag = false;
            break;
          }

          if (code[pointer] == '/') {
            addData("/", "OPERATOR", "/");
            pointer++;
            if (pointer >= code.length) {
              finalprocess();
              return;
            }
            flag = false;
            break;
          }

          if (code[pointer] == '<') {
            state = 1;
            pointer++;
            if (pointer >= code.length) {
              addData("<", "OPERATOR", "<");
              finalprocess();
              return;
            }
            break;
          }

          if (code[pointer] == '>') {
            state = 7;
            pointer++;
            if (pointer >= code.length) {
              addData(">", "OPERATOR", ">");
              finalprocess();
              return;
            }
            break;
          }

          if (code[pointer] == '=') {
            state = 4;
            pointer++;
            if (pointer >= code.length) {
              addData(">", "OPERATOR", ">");
              finalprocess();
              return;
            }
            break;
          }

          state = 100;
          break;

        case 1:
          if (code[pointer] == '=') {
            state = 2;
            pointer++;
            if (pointer >= code.length) {
              addData("<=", "OPERATOR", "<=");
              finalprocess();
              return;
            }
            break;
          }
          else {
            state = 3;
            break;
          }
        case 2:
          addData("<=", "OPERATOR", "<=");
          flag = false;
          break;
        case 3:
          addData("<", "OPERATOR", "<");
          flag = false;
          break;
        case 4:
          if (code[pointer] == '=') {
            state = 5;
            pointer++;
            if (pointer >= code.length) {
              addData("==", "OPERATOR", "==");
              finalprocess();
              return;
            }
            break;
          }
          else {
            state = 6;
            break;
          }
        case 5:
          addData("==", "OPERATOR", "==");
          flag = false;
          break;
        case 6:
          addData("=", "OPERATOR", "=");
          flag = false;
          break;
        case 7:
          if (code[pointer] == '=') {
            state = 8;
            pointer++;
            if (pointer >= code.length) {
              addData(">=", "OPERATOR", ">=");
              finalprocess();
              return;
            }
            break;
          }
          else {

            state = 9;
            break;
          }
        case 8:
          addData(">=", "OPERATOR", ">=");
          flag = false;
          break;
        case 9:
          addData(">", "OPERATOR", ">");
          flag = false;
          break;
        case 100:
          pointer++;
          alert("error at " + pointer);
          flag = false;
          break;
      }
    }
  }


}

function download(mytext) {
  const blob = new Blob([mytext], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'example.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function App() {
  const [code, setcode] = useState("");
  const [signtable, settable] = useState([]);
  const [tokentext, settokentext] = useState("");
  const [chartable, setchartable] = useState(new Map());
  const [stringtable, setstringtable] = useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  function button1click() {
    startlexicalanalysis(code, settable, setchartable, setstringtable);
  }
  function button2click() {
    download(tokentext);
  }



  return (
    <div>
      <div className="myboard">
        <h1>词法分析</h1>
        <div className="board-shower">
          <CodeInputer code={code} setcode={setcode} />
          <div className="spacer"></div>{ }
          <TokenShower signtable={signtable} settokentext={settokentext} />
        </div>
        <div className="board-shower">
          <button className="button1" onClick={() => button1click()}>
            词法分析
          </button>
          <button className="button1" onClick={() => handleClickOpen()}>
            查看字符串表
          </button>
          <Tooltip title="下载token序列" placement="right">
            <button className="button2" onClick={() => button2click()}>
              保存Token序列
            </button>
          </Tooltip>
        </div>
      </div >
      <SignTableShower signtable={chartable} handleClickOpen={handleClickOpen} />
      <StringTableShower open={open} onClose={handleClose} stringtable={stringtable} />
    </div>
  );
}



export default App;
