import MaterialTable from "material-table"
import Button from "components/CustomButtons/Button.js"
import { Dialog } from "@material-ui/core"
import { useState } from "react"
import React from "react"
import PubSub from "pubsub-js"
import DialogSelector from "./DialogSelector"
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
  createTxt,
  onCreate,
  actions = [],
  ...otherProps
}) => {
  const [open, setOpen] = useState(false)
  if (!data) return <h3 className='text-c'>{noDataTxt}</h3>
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
            ...actions,
            onDetails
              ? {
                  icon: "remove_red_eye",
                  tooltip: detailTxt,
                  onClick: (_, rowData) => onDetails(rowData)
                }
              : undefined,
            onRemove
              ? {
                  icon: "clear",
                  tooltip: removeTxt,
                  onClick: (_, rowData) =>
                    PubSub.confirm({
                      title: removeTxt + " ?",
                      onAgree: _ => onRemove(rowData.id)
                    })
                }
              : undefined
          ]}
          onRowClick={_ => null}
          options={{
            filtering: true,
            search: false,
            toolbar: false,
            header: hideHeader ? false : true,
            paging: false,
            filtering: false,
            actionsColumnIndex: -1
          }}
          {...otherProps}
        />
      )}
      {data.length === 0 && <h3 style={{ textAlign: "center" }}>{noDataTxt}</h3>}
      <div className='justify-c align-c margin-top'>
        {onAdd && (
          <Button style={{ maxWidth: 200 }} color='primary' variant='contained' onClick={_ => setOpen(true)}>
            {addTxt}
          </Button>
        )}
        {onCreate && (
          <Button style={{ fontSize: 20, padding: 0, height: 30, width: 30 }} color='primary' variant='contained' onClick={onCreate}>
            +
          </Button>
        )}
      </div>
      <DialogSelector
        data={(addData || []).filter(c => !data.some(p => p.id === c.id))}
        onClose={_ => setOpen(false)}
        open={open}
        columns={addColumn}
        selectTxt={addTxt}
        onSelect={rowData => onAdd(rowData.id)}
        title={addTxt}
        onCreate={onCreate}
        createTxt={createTxt}
        add
      />
    </div>
  )
}
