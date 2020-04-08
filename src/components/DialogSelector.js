import { Dialog } from "@material-ui/core"
import MaterialTable from "material-table"
import React, { useState } from "react"

export default function DialogSelector({ data, open, onClose, columns, selectTxt, onSelect, title, add, onCreate, createTxt }) {
  const actions = [
    {
      icon: add ? "add" : "check",
      tooltip: selectTxt,
      onClick: (_, rowData) => {
        onSelect(rowData)
        onClose()
      },
    },
  ]
  if (onCreate)
    actions.push({
      icon: "add",
      tooltip: createTxt,
      isFreeAction: true,
      onClick: onCreate,
    })
  return (
    <Dialog onClose={onClose} open={open}>
      <MaterialTable
        title={title}
        isLoading={!data}
        data={data}
        className='fullW'
        columns={columns}
        actions={actions}
        onRowClick={(_) => null}
        options={{
          filtering: true,
          pageSize: 20,
          toolbar: true,
          actionsColumnIndex: -1,
        }}
      />
    </Dialog>
  )
}
