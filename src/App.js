import logo from './logo.svg';
import './App.css';
import { App1 } from './sc';
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
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem } from '@mui/x-tree-view';
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
function GraphShower({ LR0State, LRmod, LRedges }) {

  const nodes = [];
  for (let i = 0; i < LR0State.length; i++) {
    let templabel = `I${i}\n`;
    LR0State[i].forEach((item) => {
      if (item.word === '') {
        if (LRmod === 3)
          templabel += `${item.start}→·,${item.expect}\n`;
        else
          templabel += `${item.start}→·\n`;
      }
      else {
        if (LRmod === 3)
          templabel += `${item.start}→${item.word.slice(0, item.pos)}·${item.word.slice(item.pos)},${item.expect}\n`;
        else
          templabel += `${item.start}→${item.word.slice(0, item.pos)}·${item.word.slice(item.pos)}\n`;

      }
    });

    nodes.push({ id: i, label: templabel, color: "#C2FABC" });
  }


  const graph = {
    nodes: nodes,
    edges: LRedges
  };

  const options = {
    nodes: {
      shape: "box",
      font: {
        size: 25,
        color: "#5b83be",
        //设置字体
        face: "MyCustomFont",
      },
    },
    interaction: {
      hover: true,
    },
    physics: {
      enabled: false,
      hierarchicalRepulsion: {
        nodeDistance: 40,
      },
      stabilization: {
        iterations: 30,
        fit: true,
      },
    },
    layout: {
      hierarchical: {
        enabled: false,
        parentCentralization: false,
        blockShifting: false,
        edgeMinimization: false,
        direction: "LR",
      },
    },
    edges: {
      hoverWidth: 2,
      width: 1.5,
      color: "#243724",
      font: {
        size: 32,
        color: "black",
        face: "MyCustomFont",
      },
    },
    height: "500px",
    width: "900px"
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
    }
  };

  return (
    <div style={{ background: "white" }}>
      <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={(network) => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
    </div>
  );


}

function TemporaryDrawer({ rows, setRows }) {

  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const myexport = () => {
    let tempString = '';
    for (let i = 0; i < rows.length; i++) {

      for (let j = 0; j < rows[i].length; j++) {
        tempString += rows[i][j];
        if (j == 0) {
          tempString += '->';
        }
        else if (j != rows[i].length - 1) {
          tempString += '|';
        }
      }
      if (i != rows.length - 1) {
        tempString += '\n';
      }

    }
    setInputValue(tempString);
  }
  const myinport = () => {
    const tempArray = inputValue.split('\n');
    const tempArray2 = [];
    tempArray.map((item, index) => {
      const tempArray3 = item.split('->');
      const tempArray4 = tempArray3[1].split('|');
      tempArray2.push([tempArray3[0], ...tempArray4]);
    });
    setRows(tempArray2);
  }

  return (
    <div className="record-tool">
      <div className="Output-board">
        <button className="add-button-style" onClick={myinport}>↑</button>
        <button className="add-button-style" onClick={myexport}>↓</button>
      </div>
      < Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' },
        }
        }
        noValidate
        autoComplete="off"
      >

        <div>
          <TextField
            id="outlined-multiline-static"
            label="Input Grammar"
            multiline
            rows={4}
            onChange={handleInputChange}
            value={inputValue}

          />
        </div>
      </Box >
    </div >
  );
}

function StateShower({ LR0State, LRmod }) {


  const data = [];
  LR0State.map((value, index) => {

    const tempdata = {
      id: `I${index}`,
      label: `State I${index}`,
      children: [],
    };

    value.forEach((item) => {
      if (item.word === '') {
        if (LRmod === 3)
          tempdata.children.push({ id: `I${index}PS${item.start}E${item.expect}`, label: `${item.start}→·,${item.expect}` });
        else
          tempdata.children.push({ id: `I${index}PCS${item.start}`, label: `${item.start}→·` });

      }
      else {
        if (LRmod === 3)
          tempdata.children.push({ id: `I${index}WS${item.start}${item.word}P${item.pos}E${item.expect}`, label: `${item.start}→${WordtoLetterArray(item.word).slice(0, item.pos).join("")} · ${WordtoLetterArray(item.word).slice(item.pos).join("")},${item.expect}` });
        else
          tempdata.children.push({ id: `I${index}PS${item.start}${item.word}E${item.pos}`, label: `${item.start}→${WordtoLetterArray(item.word).slice(0, item.pos).join("")} · ${WordtoLetterArray(item.word).slice(item.pos).join("")}` });

      }
    });

    data.push(tempdata);
  });


  return (
    <Box >
      <RichTreeView items={data} />
    </Box>
  );
}

function TableShower({ SelectCluster }) {

  let LL1flag = true;
  function IfContradict(mydata) {
    let flag = false;
    const tempset = new Set();
    const wordset = new Set();
    mydata.map((item, index) => {
      if (!wordset.has(item.word)) {
        wordset.add(item.word);

        item.select.map((value, index2) => {
          if (tempset.has(value)) {
            flag = true;
            LL1flag = false;
          }
          else {
            tempset.add(value);
          }
        });
      }


    });
    return flag;
  }

  function createData(name1, data) {
    const temphistory = [];
    const wordset = new Set();
    data.map((item, index) => {
      if (!wordset.has(item.word)) {
        temphistory.push({ date: (name1 + '→' + item.word), customerId: `{ ${item.select.join(',')} }` });
        wordset.add(item.word);
      }
    });

    return {
      name: name1,
      contradict: IfContradict(data),
      history: temphistory,
    };
  }

  const tabledata = [];

  SelectCluster.forEach((value, key) => {
    tabledata.push(createData(key, value));
  });



  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const color1 = row.contradict ? '#ffebe5' : '#e5faff';

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell style={{ backgroundColor: row.contradict ? '#ffb3b3' : '#ccf4ff' }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell style={{ fontFamily: "MyCustomFont", fontSize: '20px', backgroundColor: row.contradict ? '#ffb3b3' : '#ccf4ff', color: row.contradict ? 'red' : 'green', fontWeight: 'bold' }} component="th" scope="row">
            {row.name}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: color1 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                </Typography>
                <Table size="small" aria-label="purchases" >
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontFamily: "MyCustomFont", textAlign: 'center', backgroundColor: color1 }}>Producer</TableCell>
                      <TableCell style={{ fontFamily: "MyCustomFont", textAlign: 'center', backgroundColor: color1 }}>Select Cluster</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell style={{ fontFamily: "MyCustomFont", textAlign: 'center', fontSize: '20px', backgroundColor: color1 }} component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell style={{ fontFamily: "MyCustomFont", textAlign: 'center', fontSize: '20px', backgroundColor: color1 }}>{historyRow.customerId}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  Row.propTypes = {
    row: PropTypes.shape({
      history: PropTypes.arrayOf(
        PropTypes.shape({
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  };


  return (
    <TableContainer component={Paper}>
      <Stack sx={{ width: '600px' }} spacing={2}>
        {LL1flag ? <Alert severity="success" >This may be LL1.</Alert> : <Alert severity="error">This is not LL1.</Alert>}
      </Stack>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>

          </TableRow>
        </TableHead>
        <TableBody >
          {tabledata.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // Ensure the content takes full height
      }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Word({ content, onEdit }) {
  const handleEdit = () => {
    const newContent = prompt('Enter new content:', content);
    if (newContent == '') {
      onEdit('ε');
    }
    else if (newContent != null) {
      onEdit(newContent);
    }
  };

  return (
    <span className="word" onClick={handleEdit}>
      {content}
    </span>
  );
}

function Row({ mykey, words, onWordEdit, RadioChange, selectedKey }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="row">
      <Tooltip title="set start" placement="left">
        <button
          onClick={() => RadioChange(mykey)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            padding: '10px 20px',
            backgroundColor: isHovered ? '#b3ffb3' : mykey === selectedKey ? '#66ff66' : '#ffffff',
            border: isHovered ? '1px solid #ccc' : '1px solid #ffffff',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            fontSize: '1.2em',
          }}
        >
        </button>
      </Tooltip>
      {
        words.map((word, index) => (
          <React.Fragment key={index}>
            {index === 1 ? <span>&rarr;</span> : index === 0 ? null : <span>|</span>}
            <Word content={word} onEdit={(newContent) => onWordEdit(index, newContent)} />
          </React.Fragment>
        ))
      }
      < button className="button-style" onClick={() => onWordEdit(words.length, String.fromCharCode(97 + words.length - 1))}>
        +
      </button>
    </div >
  );
}

function getSelectedValue(name) {
  const radioButtons = document.getElementsByName(name);
  let selectedValue;

  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      break;
    }
  }
  return selectedValue;
}

function WordtoLetterArray(word) {
  const keyword = new Set(['int', 'float', 'while', 'else', 'if', '==', '<=', '>=', 'id', 'digits']);

  const tempArray = [];

  let flag = true;
  for (let i = 0; i < word.length; i++) {
    flag = true;
    for (let j = 1; j < word.length + 1 - i; j++) {
      if (keyword.has(word.substr(i, j))) {
        tempArray.push(word.substr(i, j));
        i += j - 1;
        flag = false;
        break;
      }


    }
    if (flag)
      tempArray.push(word[i]);
  }

  let count = 0;
  for (let i = tempArray.length - 1; i >= 0; i--) {
    if (tempArray[i] === '\'')
      count++;
    else if (count > 0) {
      while (count > 0) {
        tempArray[i] = tempArray[i] + '\'';
        count--;
      }
    }
  }

  const filteredArray = tempArray.filter(item => item !== '\'');


  return filteredArray;
}


function CaculateFirst(ClusterData, myMap) {
  ClusterData.map((production, index) => {
    if (!myMap.has('production[0]')) {
      myMap.set(production[0], new Set());
    }
  });

  var flag = true;
  var i = 0;
  while (i < 100 && flag) {
    i++;
    flag = false;
    ClusterData.map((production, index) => {
      const first = production[0];
      const rest = production.slice(1);
      rest.map((word, index2) => {
        var flag2 = true;
        WordtoLetterArray(word).forEach((letter) => {
          if (myMap.has(letter)) {
            myMap.get(letter).forEach((value) => {
              if (!myMap.get(first).has(value)) {
                if (flag2) {
                  myMap.get(first).add(value);
                  flag = true;
                }
              }
            });
            if (!myMap.get(letter).has('ε')) {
              flag2 = false;
            }
          }
          else if (letter === 'ε' && !myMap.get(first).has('ε')) {
            myMap.get(first).add('ε');
            flag = true;
          }
          else {
            if (flag2 && !myMap.get(first).has(letter)) {
              myMap.get(first).add(letter);
              flag = true;
            }
            flag2 = false;
          }
        });
      });
    }
    );
  }

  if (i > 99) {
    alert("Infinite Loop");
  }
}

function ClusterShower({ title, myMap }) {

  const BoardData = [];
  myMap.forEach((value, key) => {
    BoardData.push([key, Array.from(value)]);
  });

  return (
    <div className="first-cluster">
      <h4>{title} Cluster</h4>
      {BoardData.map((words, index) => (
        <p> {title}( {words[0]} ) = {`{ ${words.slice(1).join(',')} }`}</p>
      ))}
    </div>
  );
}

function getFirstofString(FirstCluster, tempArray) {
  const result = new Set();

  let flag = true;
  tempArray.map((letter, index) => {
    if (!FirstCluster.has(letter) && flag) {
      result.add(letter);
      flag = false;
    }
    else if (flag) {
      FirstCluster.get(letter).forEach((value) => {
        if (value !== 'ε')
          result.add(value);
      });

      if (!FirstCluster.get(letter).has('ε')) {
        flag = false;
      }
    }
  });

  if (flag)
    result.add('ε');

  return result;
}

function CaculateFollow(ClusterData, myMap, FirstCluster, startSymbol) {
  ClusterData.map((production, index) => {
    if (!myMap.has('production[0]')) {
      myMap.set(production[0], new Set());
    }
  });

  var flag = true;

  function addElementtoCluster(element, symbol) {
    if (!myMap.get(symbol).has(element)) {
      myMap.get(symbol).add(element);
      flag = true;
    }
  }

  function addSettoCluster(source_set, symbol, hasEpsilon) {
    source_set.forEach((value) => {
      if (value !== 'ε' || hasEpsilon) {
        addElementtoCluster(value, symbol);
      }
    });
  }

  let j = 0;
  while (flag && j < 100) {
    j++;
    flag = false;
    addElementtoCluster('$', startSymbol);
    ClusterData.map((production, index) => {
      const first = production[0];
      const rest = production.slice(1);
      rest.map((word, index2) => {
        const tempArray = WordtoLetterArray(word);
        for (let i = 0; i < tempArray.length; i++) {
          if (FirstCluster.has(tempArray[i])) {
            if (i === tempArray.length - 1) {
              addSettoCluster(myMap.get(first), tempArray[i], true);
            }
            else {
              addSettoCluster(getFirstofString(FirstCluster, tempArray.slice(i + 1)), tempArray[i], false);
              if (getFirstofString(FirstCluster, tempArray.slice(i + 1)).has('ε')) {
                addSettoCluster(myMap.get(first), tempArray[i], true)
              }
            }
          }
        }
      });
    });
  }

  if (j > 99) {
    alert("Infinite Loop");
  }

}

function CaculateSelect(FirstCluster, FollowCluster, WenfaData, SelectCluster) {

  WenfaData.map((production, index) => {
    SelectCluster.set(production[0], []);
  });

  WenfaData.map((production, index) => {
    const first = production[0];
    const rest = production.slice(1);
    rest.map((word, index2) => {
      const tempArray = WordtoLetterArray(word);
      const FirstofString = getFirstofString(FirstCluster, tempArray);
      if (FirstofString.has('ε')) {
        const tempSet = new Set(Array.from(FollowCluster.get(first)));
        FirstofString.delete('ε');
        FirstofString.forEach((value) => {
          tempSet.add(value);
        });
        SelectCluster.get(first).push({ word: word, select: Array.from(tempSet) });

      }
      else {
        SelectCluster.get(first).push({ word: word, select: Array.from(FirstofString) });
      }

    });
  });
}

function ShowLR0Table({ setLRmod, tabledata, ProducerSet, LR0State, LRmod, rows, setrows, setSymboltonumer }) {
  // 示例数据
  const headers = ['State',];


  const symbolset = new Set();//终结符集合
  ProducerSet.forEach((value, key) => {
    value.forEach((value2) => {
      WordtoLetterArray(value2).forEach((value3) => {
        if (!ProducerSet.has(value3) && value3 !== 'ε')
          symbolset.add(value3);
      });
    });
  });
  const symbolarray = Array.from(symbolset);

  symbolarray.sort();
  const symbolmap = new Map();
  let index = 1;
  symbolarray.forEach((item) => {
    headers.push(item);
    symbolmap.set(item, index);
    index++;
  });
  headers.push('$');
  symbolmap.set('$', index);
  index++;

  ProducerSet.forEach((value, key) => {
    headers.push(key);
    symbolmap.set(key, index);
    index++;
  });

  const symbolmap2 = new Map();
  symbolmap.forEach((value, key) => {
    symbolmap2.set(value, key);
  });



  let flag = false;

  function caculateRows() {
    flag = false;
    const rows2 = [];
    for (let i = 0; i < LR0State.length; i++) {
      const temp = [];
      temp.push({ text: i.toString(), i: i, j: 0 });
      for (let j = 1; j < index; j++) {
        temp.push({ text: '', x: i, y: j });
      }
      rows2.push(temp);
    }
    tabledata.forEach((value) => {
      rows2[parseInt(value[0])][parseInt(symbolmap.get(value[1]))].text = rows2[parseInt(value[0])][parseInt(symbolmap.get(value[1]))].text + value[2];
    });
    setrows(rows2);
    setSymboltonumer(symbolmap);
  }


  function handleClickOpen(x, y) {
    const newContent = prompt('Enter new content:', rows[x][y].text);
    if (newContent == null)
      return;
    const rows2 = [];
    for (let i = 0; i < LR0State.length; i++) {
      const temp = [];
      for (let j = 0; j < index; j++) {
        temp.push(rows[i][j]);
      }
      rows2.push(temp);
    }
    rows2[x][y].text = newContent;
    setrows(rows2);
  }


  // 生成表格头部
  const tableHeaders = headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));


  function ifwrong(mydata) {
    let count = 0;
    Array.from(mydata).forEach((item) => {
      if (item === 'r' || item === 's' || item === 'acc') {
        count++;
      }
    });
    if (count > 1)
      flag = true;
    return count > 1;
  }
  // 生成表格行

  const tableRows = rows.map((rowData, rowIndex) => (
    <tr key={rowIndex}>
      {rowData.map((cellData, cellIndex) => (
        <td onClick={() => handleClickOpen(cellData.x, cellData.y)} key={cellIndex} style={{ backgroundColor: ifwrong(cellData.text) ? '#ff6666' : 'white' }}>{<span >
          {cellData.text}
        </span>} </td>
      ))}
    </tr>
  ));


  function handleclick(i) {
    setLRmod(i);
  }



  // 返回渲染的表格
  return (
    <div className="record-tool">
      <div className="Output-board">
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button variant={LRmod === 1 ? "contained" : "outlined"} onClick={() => handleclick(1)}>LR(0) </Button>
          <Button variant={LRmod === 2 ? "contained" : "outlined"} onClick={() => handleclick(2)}>SLR(1)</Button>
          <Button variant={LRmod === 3 ? "contained" : "outlined"} onClick={() => handleclick(3)}>LR(1)</Button>

        </ButtonGroup>
        <Tooltip title="计算分析表" placement="right">
          <button className="add-button-style" onClick={caculateRows}>计算</button>
        </Tooltip>
      </div>
      {flag ? <Alert severity="error" >请单击红色区域消除冲突</Alert> : <Alert severity="success" >该分析表无冲突</Alert>}
      <table className="my-table">
        <thead>
          <tr>{tableHeaders}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>

    </div>

  );
}

function CaculateLR0State(startProducer, ProducerSet, LR0State, tabledata, FirstCluster, Follow, LRmod, LRedges) {

  function CLOSURE(I, ProducerSet) {
    const result = new Set();
    if (I.size === 0) {
      return result;
    }

    I.forEach((item) => {
      if (item.word === 'ε') {
        item.word = '';
        item.pos = 0;
      }
      result.add(item);
    });

    let flag = true;
    while (flag) {
      flag = false;
      const nextAddSet = new Set();
      result.forEach((item) => {
        if (WordtoLetterArray(item.word).length > item.pos && ProducerSet.has(WordtoLetterArray(item.word)[item.pos])) {
          ProducerSet.get(WordtoLetterArray(item.word)[item.pos]).forEach((value) => {
            if (value !== 'ε') {
              if (LRmod === 3) {
                const temparray = WordtoLetterArray(item.word).slice(item.pos + 1);
                temparray.push(item.expect);
                const temp_follow = getFirstofString(FirstCluster, temparray);
                temp_follow.forEach((value2) => {
                  nextAddSet.add({ start: WordtoLetterArray(item.word)[item.pos], word: value, pos: 0, expect: value2 });
                });

              }
              else
                nextAddSet.add({ start: WordtoLetterArray(item.word)[item.pos], word: value, pos: 0 });
            }
            else {
              if (LRmod === 3) {
                const temparray = WordtoLetterArray(item.word).slice(item.pos + 1);
                temparray.push(item.expect);
                const temp_follow = getFirstofString(Follow, temparray);

                temp_follow.forEach((value2) => {
                  nextAddSet.add({ start: WordtoLetterArray(item.word)[item.pos], word: '', pos: 0, expect: value2 });
                });
              }
              else
                nextAddSet.add({ start: WordtoLetterArray(item.word)[item.pos], word: '', pos: 0 });
            }
          });
        }
      });

      nextAddSet.forEach((item) => {
        let hasitem = false;
        result.forEach((value) => {
          if (value.start === item.start && value.word === item.word && value.pos === item.pos) {
            if (LRmod === 3) {
              if (value.expect === item.expect) {
                hasitem = true;
              }
            }
            else
              hasitem = true;
          }
        });
        if (!hasitem) {
          result.add(item);
          flag = true;
        }
      });
    }
    return result;
  }

  function GOTO(i, I, X, ProducerSet) {
    const J = new Set();
    I.forEach((item) => {
      if (WordtoLetterArray(item.word).length > item.pos && WordtoLetterArray(item.word)[item.pos] === X) {

        J.add({ start: item.start, word: item.word, pos: item.pos + 1, expect: item.expect });

      }
      else if (WordtoLetterArray(item.word).length === item.pos) {
        let sum = 0;
        ProducerSet.forEach((value, key) => {
          if (key !== item.start)
            sum += value.size;
          else {
            value.forEach((value2) => {
              if (value2 !== item.word && !(item.word == '' && value2 == 'ε')) {
                sum++;
              }
              else {
                if (!ProducerSet.has(X)) {
                  if (item.start === startProducer[0].start) {
                    if (X === '$')
                      tabledata.push([i, X, 'acc']);
                  }
                  else {

                    if (LRmod === 1)
                      tabledata.push([i, X, 'r' + sum.toString()]);
                    if (LRmod === 2) {
                      if (Follow.get(item.start).has(X)) {
                        tabledata.push([i, X, 'r' + sum.toString()]);
                      }
                    }
                    if (LRmod === 3) {
                      if (item.expect === X) {
                        tabledata.push([i, X, 'r' + sum.toString()]);
                      }
                    }
                  }

                }
              }
            });
          }

        });


      }
    });
    return CLOSURE(J, ProducerSet);
  }

  LR0State.push(CLOSURE(startProducer, ProducerSet));

  for (let i = 0; i < LR0State.length; i++) {
    const itemset = LR0State[i];

    const symbolset = new Set();

    itemset.forEach((item) => {
      if (WordtoLetterArray(item.word).length > item.pos) {
        symbolset.add(WordtoLetterArray(item.word)[item.pos]);
      }
    });
    ProducerSet.forEach((value, key) => {
      symbolset.add(key);
      value.forEach((value2) => {
        WordtoLetterArray(value2).forEach((value3) => {
          if (!ProducerSet.has(value3) && value3 !== 'ε')
            symbolset.add(value3);
        });
      });
    });
    symbolset.add('$');

    const symbolarray = [];
    symbolset.forEach((item) => {
      symbolarray.push(item);
    });


    symbolarray.forEach((symbol) => {
      const ans = GOTO(i, itemset, symbol, ProducerSet);
      if (ans.size !== 0) {
        const temp = ans.values().next().value;
        let hasitem = false;
        let value;
        for (let j = 0; j < LR0State.length; j++) {
          LR0State[j].forEach((item) => {
            if (item.start === temp.start && item.word === temp.word && item.pos === temp.pos && LR0State[j].size === ans.size) {
              if (LRmod === 3) {
                if (item.expect === temp.expect) {
                  hasitem = true;
                  value = j;
                }
              }
              else {
                hasitem = true;
                value = j;
              }
            }
          });
        }
        if (!hasitem) {
          LR0State.push(ans);
          value = LR0State.length - 1;
        }
        if (ProducerSet.has(symbol)) {
          tabledata.push([i, symbol, value]);
          LRedges.push({ from: i, to: value, label: symbol });
        }
        else {
          tabledata.push([i, symbol, 's' + value.toString()]);
          LRedges.push({ from: i, to: value, label: symbol });
        }

      }
    });
  }
}

function ProducerShower({ ProducerSet }) {

  const BoardData = [];
  let index = 0;
  ProducerSet.forEach((value, key) => {
    value.forEach((value2) => {

      BoardData.push([index, key, value2]);
      index++;
    });
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontFamily: "MyCustomFont", textAlign: 'center', backgroundColor: '#ccf4ff' }}>Index</TableCell>
            <TableCell style={{ fontFamily: "MyCustomFont", textAlign: 'center', backgroundColor: '#ccf4ff' }}>Producer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {BoardData.map((row) => (
            <TableRow key={row[0]}>
              <TableCell style={{ fontFamily: "MyCustomFont", textAlign: 'center', fontSize: '20px', backgroundColor: '#ccf4ff' }} component="th" scope="row">
                {row[0]}
              </TableCell>
              <TableCell style={{ fontFamily: "MyCustomFont", textAlign: 'center', fontSize: '20px', backgroundColor: '#ccf4ff' }}>{row[1] + '→' + row[2]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );


}

function CaculateProducerSet(rows, ProducerSet, startProducer) {
  rows.map((production, index) => {
    if (!ProducerSet.has(production[0])) {
      ProducerSet.set(production[0], new Set());
    }
  });

  rows.map((production, index) => {
    const first = production[0];
    const rest = production.slice(1);
    rest.map((word, index2) => {
      ProducerSet.get(first).add(word);
    });
  });
}




function App() {
  //Grammer
  const [rows, setRows] = useState([['S', 'abc']]);
  const [startProducer, setSelectedKey] = useState(0);

  const ProducerSet = new Map();
  const FirstCluster = new Map();
  const FollowCluster = new Map();
  const SelectCluster = new Map();
  const [value, setValue] = React.useState(0);
  const LR0State = [];
  const tabledata = [];
  const [LRmod, setLRmod] = useState(1);
  const [rows2, setrows2] = useState([]);

  const [symboltonumer, setSymboltonumer] = useState(new Map());


  const handleRadioChange = (input) => {
    setSelectedKey(parseInt(input));
  };
  const addRow = () => {
    setRows([...rows, [String.fromCharCode(64 + rows.length), 'a']]);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const clearall = () => {
    setRows([['S', 'abc']]);
    setSelectedKey(0);
  };

  const LRedges = [];

  const [ifdraw, setmydraw] = useState(false);
  function setdraw(i) {
    setmydraw(i);
  }

  CaculateProducerSet(rows, ProducerSet);
  CaculateFirst(rows, FirstCluster);
  CaculateFollow(rows, FollowCluster, FirstCluster, rows[startProducer][0]);
  CaculateSelect(FirstCluster, FollowCluster, rows, SelectCluster);


  let oneStart = true;
  if (ProducerSet.get(rows[startProducer][0]).size === 1) {
    CaculateLR0State([{ start: rows[startProducer][0], word: ProducerSet.get(rows[startProducer][0]).values().next().value, pos: 0, expect: '$' }], ProducerSet, LR0State, tabledata, FirstCluster, FollowCluster, LRmod, LRedges);
  }
  else
    oneStart = false;

  return (
    <div className="record-tool">
      <div className="wenfa">
        {rows.map((words, index) => (
          <Row key={index} mykey={index} words={words} selectedKey={startProducer} RadioChange={handleRadioChange} onWordEdit={(wordIndex, newContent) => handleWordEdit(index, wordIndex, newContent)} />
        ))}
      </div>
      <div className="option-board">
        <button className="add-button-style" onClick={addRow}>Add Producer</button>
        <button className="clear-button-style" onClick={clearall}>Clear All</button>
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} textColor="secondary" onChange={handleChange} aria-label="basic tabs example" centered>
            <Tab label="简易编译器" {...a11yProps(0)} />
            <Tab label="LR计算器" {...a11yProps(1)} />
            <Tab label="导入文法" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="Output-board">
            <App1 LRrows={rows2} producerset={ProducerSet} symboltonumber={symboltonumer} />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="Output-board">
            <CustomTabPanel value={value} index={1}>
              <ProducerShower ProducerSet={ProducerSet} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>

              <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button onClick={() => setdraw(false)}>Show List</Button>
                <Button onClick={() => setdraw(true)}>Draw it</Button>
              </ButtonGroup>

              {oneStart ? ifdraw ? <GraphShower LR0State={LR0State} LRedges={LRedges} LRmod={LRmod} /> : <StateShower LR0State={LR0State} LRmod={LRmod} /> : <Alert severity="error">请使用增广文法</Alert>}

            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <ShowLR0Table setLRmod={setLRmod} tabledata={tabledata} ProducerSet={ProducerSet} LR0State={LR0State} LRmod={LRmod} rows={rows2} setrows={setrows2} setSymboltonumer={setSymboltonumer} />
            </CustomTabPanel>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <TemporaryDrawer rows={rows} setRows={setRows} />
        </CustomTabPanel>

      </Box>
    </div>
  );

  function handleWordEdit(rowIndex, wordIndex, newContent) {
    // if (rowIndex === 0 && wordIndex === 0) {
    //   alert('S is the start symbol and cannot be changed');
    //   return;
    // }
    const newRows = [...rows];
    newRows[rowIndex][wordIndex] = newContent;
    setRows(newRows);
  }
}



export default App;
