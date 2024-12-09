import Pagination from '@/Components/Pagination';
import { paginationOptions } from '@/fixed-options';
import { Link, router } from '@inertiajs/react';
import { ArrowDownNarrowWide, ArrowUpNarrowWide, Ellipsis } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function RoutingsTable({ routings, search = '', sortColumn = '', sortDirection = '' }) {
    const [currentSearch, setCurrentSearch] = useState(search);
    const [currentSortColumn, setCurrentSortColumn] = useState(sortColumn);
    const [currentSortDirection, setCurrentSortDirection] = useState(sortDirection);
    const tableHeaders = [
        { label: 'Doc Tin', labelKey: 'docTin', sortable: true },
        { label: 'From', labelKey: 'fromUserId', sortable: true },
        { label: 'Status', sortable: true },
        { label: '', sortable: false },
        { label: '', sortable: false },
    ];

    useEffect(() => {
        // Automatically update the search value when it changes
        if (currentSearch !== search) {
            setCurrentSearch(search);
        }
    }, [search]);

    const handleSearchChange = (e) => {
        const newSearch = e.target.value;
        setCurrentSearch(newSearch);
        // Send a GET request with the search query
        router.get(route('routing.index'), { search: newSearch });
    };

    const handleSort = (column) => {
        // Determine the direction of the sort
        let direction = 'asc';
        if (column === currentSortColumn && currentSortDirection === 'asc') {
            direction = 'desc';
        }

        setCurrentSortColumn(column);
        setCurrentSortDirection(direction);

        // Send a GET request with the sort parameters
        router.get(route('routing.index'), {
            search: currentSearch,
            sort: column,
            direction,
            page: 1,
        });
    };

    return (
        <>
            <div className='flex justify-end mb-2'>
                {/* <div className='inline-flex items-center gap-2 flex-row-reverse'>
                                                  <label htmlFor="paginate" className='text-xs'>per page</label>
                                                  <select
                                                            id="paginate"
                                                            className="h-7 text-xs bg-transparent text-gray-200 rounded text-center"
                                                            value={paginate}
                                                            onChange={(e) => {
                                                                      router.get(route('routing.index'), {
                                                                                paginate: e.target.value,
                                                                      });
                                                            }}
                                                  >
                                                            {paginationOptions.map((option) => (
                                                                      <option
                                                                                className='bg-transparent'
                                                                                key={option}
                                                                                value={option}
                                                                      >
                                                                                {option}
                                                                      </option>
                                                            ))}
                                                  </select>
                                        </div> */}


                <input
                    autoFocus
                    className="table-search"
                    type="search"
                    defaultValue={currentSearch || ''}
                    onKeyUp={handleSearchChange}
                    placeholder="Search..."
                />

            </div>

            <div className='rounded-t-lg border max-w-full overflow-auto'>
                <table className='min-w-max w-full'>
                    <thead className='uppercase text-black dark:text-white text-sm border-b'>
                        <tr>
                            {tableHeaders.map((header, index) => (
                                <th
                                    key={index}
                                    className="py-3 px-2"
                                    onClick={() => header.sortable && handleSort(header.labelKey)}
                                >
                                    <div
                                        className={`inline-flex justify-between items-center w-full text-start ${header.sortable ? 'cursor-pointer' : ''}`}
                                    >
                                        {header.label}
                                        {header.sortable ?
                                            currentSortColumn === header.labelKey &&
                                                currentSortDirection === 'asc' ? (
                                                <ArrowUpNarrowWide />
                                            ) : <ArrowDownNarrowWide />
                                            : null
                                        }

                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {routings.data.length > 0 ? (
                            routings.data.map((routing, index) => (
                                <tr key={index} className='dark:hover:bg-gray-700 hover:bg-gray-100'>
                                    <td className='py-3 px-2'>{routing.docTin}</td>
                                    <td>{routing.fromUser.fullName}</td>
                                    <td>{routing.status}</td>
                                    <td className='text-xs text-gray-400'>{routing.createdAt}</td>
                                    <td>
                                        <div className='flex'>
                                            <Link href={route('transaction.show', routing.transactionId)}>
                                                <Ellipsis />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={tableHeaders.length} className='text-center py-3 px-2'>
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className='flex justify-end'>
                <Pagination links={routings.meta.links} />
            </div>
        </>
    );
}
