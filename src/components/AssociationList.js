import MaterialTable from "material-table"
import Button from "components/CustomButtons/Button.js"
import { Dialog } from "@material-ui/core"
import { useState } from "react"
import React from "react"
import PubSub from "pubsub-js"

export default ({
  data,
  columns,
  noDataTxt,
  hideHeader,
  detailTxt,
  onDetails,
  removeTxt,
  onRemove,
  onAdd,
  addTxt,
  addData,
  addColumn,
  ...otherProps
}) => {
  const [open, setOpen] = useState(false)
  if (!data) return <h3 style={{ textAlign: "center" }}>{noDataTxt}</h3>
  return (
    <div className='col align-c'>
      {data.length > 0 && (
        <MaterialTable
          title=''
          isLoading={!data}
          data={data}
          style={{ width: "100%" }}
          columns={columns}
          actions={[
            onDetails
              ? {
                  icon: "remove_red_eye",
                  tooltip: detailTxt,
                  onClick: (_, rowData) => onDetails(rowData),
                }
              : undefined,
            onRemove
              ? {
                  icon: "clear",
                  tooltip: removeTxt,
                  onClick: (_, rowData) =>
                    PubSub.confirm({
                      title: removeTxt + " ?",
                      onAgree: _ => onRemove(rowData.id),
                    }),
                }
              : undefined,
          ]}
          onRowClick={_ => null}
          options={{
            filtering: true,
            search: false,
            toolbar: false,
            header: hideHeader ? false : true,
            paging: false,
            filtering: false,
            actionsColumnIndex: -1,
          }}
          {...otherProps}
        />
      )}
      {data.length === 0 && <h3 style={{ textAlign: "center" }}>{noDataTxt}</h3>}
      {onAdd && (
        <Button style={{ maxWidth: 200, marginTop: 20 }} color='primary' variant='contained' onClick={_ => setOpen(true)}>
          {addTxt}
        </Button>
      )}
      <Dialog onClose={_ => setOpen(false)} open={open}>
        <MaterialTable
          title={addTxt}
          isLoading={!addData}
          data={(addData || []).filter(c => !data.some(p => p.id === c.id))}
          style={{ width: "100%" }}
          columns={addColumn}
          actions={[
            {
              icon: "add",
              tooltip: addTxt,
              onClick: (_, rowData) => {
                onAdd(rowData.id)
                setOpen(false)
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
    </div>
  )
}
