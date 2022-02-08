import React from "react";
import { Button, Space } from "antd";
import PropTypes from "prop-types";

function FilterBar(props) {
  const { status, onChangeStatus } = props;
  console.log("status", status);
  return (
    <Space className="nav-order">
      {status.map((i, index) => (
        <Button
          className="btn btn-primary"
          to={`status/${i.value}`}
          type="default"
          key={`status-${index}`}
          onClick={() => {
            onChangeStatus(i.value);
          }}
        >
          {i.name} <i>( {i.total} )</i>
        </Button>
      ))}
    </Space>
  );
}

FilterBar.propTypes = {
  status: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
    })
  ).isRequired,
  onChangeStatus: PropTypes.func.isRequired,
};

export default FilterBar;
