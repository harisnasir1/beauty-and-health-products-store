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
import {  DelProduct,Getall_Categories,del_categories,edit_Properties,Add_Properties,del_Properties,Getall_properties} from '../Utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const columns = [
  {
    label: 'Category name',
    dataKey: 'name',
  },
  
  {
    label: 'Parent Category ',
    dataKey: 'parameter',
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

function rowContent(index, row, del, navigate,update) {
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
              onClick={() => del(row._id)}
            >
              Delete
            </button>
          ) : column.dataKey === 'update' ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() =>update(row._id)}
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

export default function ReactVirtualizedTable({name,update}) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
 
  async function getdata()
  {
    axios.get(Getall_properties)
    .then((res) => {
      const products = res.data.result.map(product => ({
        ...product,
        qty: product.qty || 0 // Ensure qty is present
      }));
      setData(products);
    })
    .catch((e) => console.log("error is ", { e }));
  }
  

  useEffect(() => {
   getdata();
  },[name]);

  const del = (id) => {
    console.log(id);
    axios.post(del_Properties, {
      id:id,
    })
    .then((res) => {
      toast("Category is deleted");
      getdata();
    })
    .catch((e) => {
      console.log("error deleting product", { e });
    });
  };

  return (
    <>
      <Paper style={{ height: '100%', width: '100%' }}>
        <TableVirtuoso
          data={data}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={(index, row) => rowContent(index, row, del, navigate,update)}
        />
      </Paper>
      <ToastContainer draggable={true} position={'bottom-right'} autoClose={900} theme='dark' pauseOnHover={false} />
    </>
  );
}
