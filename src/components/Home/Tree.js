import React, { useEffect, useState } from "react";
const Tree = ({ data = [] }) => {
  return (
    <div className="d-tree" >
      <ul className="d-flex d-tree-container flex-column">
        {data.map ((tree) => (
          <TreeNode node={tree}/>
        ))
        }
      </ul>
    </div>
  );
};

const TreeNode = ({ node }) => {
  // console.log("node:::::::::::::::::::::"+JSON.stringify(node))
  const [childVisible, setChildVisiblity] = useState(false);

  const hasChild = node.children ? true : false;
console.log('HasChild:'+childVisible)
  return (
    <ul className="d-tree-node border-0">
      <div className="d-flex" onClick={(e) => setChildVisiblity((v) => !v)}>
        {hasChild && (
          <div
            className={`d-inline d-tree-toggler ${
              childVisible ? "active" : ""
            }`}
          >
          </div>
        )}
        <div className="col d-tree-head">
          &nbsp;
      <br/>
        <i className="fas fa-caret-right"></i>
          &nbsp;
              {node.Child}
        </div>
      </div>
      {hasChild && childVisible && (
        <div className="d-tree-content">
          <ul className="d-flex d-tree-container flex-column">
            <Tree data={node.children} />
          </ul>
       
        </div>
      )}
    </ul>
  );
};


export default Tree