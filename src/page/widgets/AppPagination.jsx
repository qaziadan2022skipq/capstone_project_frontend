import { useEffect, useState } from "react";

const { Box, Pagination } = require("@mui/material");

const pageSize = 2;
const AppPagination = ({stories, setPStories}) => {
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const service = {
    getData: ({ from, to }) => {
      return new Promise((resolve, reject) => {
        const data = stories.slice(from, to);
        resolve({
          count: stories.length,
          data: data,
        });
      });
    },
  };

  useEffect(() => {
    service
      .getData({ from: pagination.from, to: pagination.to })
      .then((response) => {
        setPagination({ ...pagination, count: response.count });
        setPStories(response.data)
      });
  }, [pagination.from, pagination.to]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

    setPagination({...pagination, from: from, to: to})
  };

  return (
    <Box justifyContent="center" alignItems="center" display="flex">
      <Pagination
        count={Math.ceil(pagination.count / pageSize)}
        onChange={handleChange}
      />
    </Box>
  );
};
export default AppPagination;
