/* eslint-disable jsx-a11y/accessible-emoji */
type propsType = {
    activePage: number,
    count: number,
    rowsPerPage: number,
    totalPages: number,
    setActivePage: any
}
export const Pagination = ({ activePage, count, rowsPerPage, totalPages, setActivePage }: propsType) => {
    const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1
    const end = activePage === totalPages ? count : beginning + rowsPerPage - 1
  
    return (
      <>
        <div className="pagination">
          <button disabled={activePage === 1} onClick={() => setActivePage(1)}>
            ⏮️ First
          </button>
          <button disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)}>
            ⬅️ Previous
          </button>
          <button disabled={activePage === totalPages} onClick={() => setActivePage(activePage + 1)}>
            Next ➡️
          </button>
          <button disabled={activePage === totalPages} onClick={() => setActivePage(totalPages)}>
            Last ⏭️
          </button>
        </div>
        <p>
          Page {activePage} of {totalPages}
        </p>
        <p>
          Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
        </p>
      </>
    )
  }
  