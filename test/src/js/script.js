function sortTable (table, column, asc=true) {
    const dirMod = asc ? 1 : -1
    const tBody = table.tBodies[0]
    const rows = Array.from(tBody.querySelectorAll('tr'))

    const rowsSorted = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column  })`).textContent.trim()
        const bColText = b.querySelector(`td:nth-child(${ column })`).textContent.trim()
        
       return aColText > bColText ? (1 * dirMod) : (-1 * dirMod)
    })
    
    while(tBody.firstChild) {
        tBody.removeChild(tBody.firstChild)
    }

    tBody.append(...rowsSorted)

    table.querySelectorAll('th').forEach(th => th.classList.remove('th-sort-asc', 'th-sort-desc'))
    table.querySelector(`th:nth-child(${column})`).classList.toggle('th-sort-asc', asc)
    table.querySelector(`th:nth-child(${column})`).classList.toggle('th-sort-desc', !asc)
}


document.querySelectorAll('.table-sort th').forEach(th => {
    th.addEventListener('click', () => {
        const tableElement = th.parentElement.parentElement.parentElement
        const tableIndex = Array.prototype.indexOf.call(th.parentElement.children, th)
        const currentIsAscending = th.classList.contains('th-sort-asc')
        sortTable(tableElement, tableIndex + 1, !currentIsAscending)
    })
})