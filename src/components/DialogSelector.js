import { Dialog } from "@material-ui/core"
import MaterialTable from "material-table"
import React, { useState } from "react"

export default function DialogSelector({ data, open, onClose, columns, selectTxt, onSelect, title }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <MaterialTable
        title={title}
        isLoading={!data}
        data={data}
        style={{ width: "100%" }}
        columns={columns}
        actions={[
          {
            icon: "check",
            tooltip: selectTxt,
            onClick: (_, rowData) => {
              onSelect(rowData)
              onClose()
            },
          },
        ]}
        onRowClick={_ => null}
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
