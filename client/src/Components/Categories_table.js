import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import axios from 'axios';
import { Getall_Categories, del_categories } from '../Utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const columns = [
  {
    label: 'Category name',
    dataKey: 'Catergoy_name',
  },
  {
    label: 'Parent Category ',
    dataKey: 'parent.Catergoy_name',
    numeric: true,
  },
  {
    label: 'Delete',
    dataKey: 'delete',
    numeric: true,
  },
  {
    label: 'Update',
    dataKey: 'update',
    numeric: true,
  },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(index, row, dele, navigate, update) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {column.dataKey === 'delete' ? (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded ml-9"
              onClick={() => {dele(row._id,Event)
                toast("del");
              }}
            >
              Delete
            </button>
          ) : column.dataKey === 'update' ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => update(row._id)}
            >
              Update
            </button>
          ) : column.dataKey === 'parent.Catergoy_name' ? (
            row.parent ? row.parent.Catergoy_name : 'No Parent'
          ) : (
            row[column.dataKey]
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function ReactVirtualizedTable({ Allcat, Catname, getcategory ,del}) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getdata = async () => {
    try {
      const res = await axios.get(Getall_Categories);
      const products = res.data.result.map((product) => ({
        ...product,
        qty: product.qty || 0, // Ensure qty is present
      }));
      setData(products);
    } catch (e) {
      console.log("error is ", { e });
    }
  };

  const update = (id) => {
    getcategory(id);
  };

  useEffect(() => {
    getdata();
  }, [Allcat, Catname]);

  const showtoast=()=>{
    toast("del")
  }
  const dele = async (id,e) => {
   
        await del(id);
    getdata();
  };

  return (
    <>
      <Paper style={{ height: '100%', width: '100%' }}>
        <TableVirtuoso
          data={data}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={(index, row) => rowContent(index, row, dele, navigate, update)}
        />
      </Paper>
    </>
  );
}
