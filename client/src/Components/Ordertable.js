import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

import { getcarts } from '../Utils/ApiRoutes';

// Table columns definition
const columns = [
  {
    width: 100,
    label: 'ID',
    dataKey: '_id',
  },
  {
    width: 400,
    label: 'Recipients',
    dataKey: 'recipients',
  },
  {
    width: 400,
    label: 'Product',
    dataKey: 'product',
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

// Fixed header content
function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align="center"
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

// Row content
function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align="left"
          dangerouslySetInnerHTML={{ __html: row[column.dataKey] }}
        />
      ))}
    </React.Fragment>
  );
}

// React component
export default function ReactVirtualizedTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(getcarts)
      .then((res) => {
        console.log(res);
        // Assuming res.data is an array of cart objects with the structure you provided
        const formattedOrders = res.data.map((cart) => ({
          _id: cart._id,
          recipients: `${cart.name}<br/>${cart.email}<br/>${cart.city}, ${cart.postalcode}<br/>${cart.country}`,
          product: cart.line_items.map((item) => `${item.product_data.name}<br/>Parameter: ${item.property.parameter ?? 'N/A'}`).join('<br/>'),
        }));
        setOrders(formattedOrders);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        data={orders}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
