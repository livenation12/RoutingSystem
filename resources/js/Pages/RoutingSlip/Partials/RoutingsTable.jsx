import Dropdown from '@/Components/Dropdown';
import Pagination from '@/Components/Pagination';
import SecondaryButton from '@/Components/SecondaryButton';
import { useToast } from '@/Components/Toast';
import { Link, router, usePage } from '@inertiajs/react';
import { ArrowDownNarrowWide, ArrowUpNarrowWide, ChevronDown, Ellipsis } from 'lucide-react';
import { useEffect, useState } from 'react';


export default function RoutingsTable({ routings, search = '', sortColumn = '', sortDirection = '' }) {
    const roles = usePage().props.auth.roles
    const [currentSearch, setCurrentSearch] = useState(search);
    const [currentSortColumn, setCurrentSortColumn] = useState(sortColumn);
    const [currentSortDirection, setCurrentSortDirection] = useState(sortDirection);
    const toast = useToast();
    const tableHeaders = [
        { label: 'Doc Tin', labelKey: 'docTin', sortable: true },
        { label: 'From', labelKey: 'fromUserId', sortable: true },
        { label: 'To', labelKey: 'endorsedToOfficeId', sortable: true },
        { label: 'Subject' },
        { label: 'Status', labelKey: 'status', sortable: true },
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
    const handleStatusChange = (status, id) => {

        router.patch(route('receiver.routing-slip.mark-status', id), {
            status
        }, {
            onSuccess: () => {
                toast('Updated', 'Status updated to ' + status + ' successfully');
            },
            preserveScroll: true
        });
    }

    return (
        <>
            <div className='flex justify-end mb-2'>
                <input
                    autoFocus
                    className="table-search"
                    type="search"
                    defaultValue={currentSearch || ''}
                    onKeyUp={handleSearchChange}
                    placeholder="Search..."
                />

            </div>

            <div className='rounded-t-lg border min-h-[60vh] max-w-full overflow-auto'>
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
                                    <td>{routing.endorsedTo ? routing.endorsedTo.officeName : '--'}</td>
                                    <td className='text-xs text-gray-400 truncate max-w-[200px]'>{routing.subject}</td>
                                    <td className='rounded text-xs'>{routing.status}</td>
                                    <td className='text-xs text-gray-400'>{routing.createdDate}</td>
                                    <td>
                                        <div className='flex px-2 gap-1.5'>

                                            <Link href={route('transaction.show', routing.transactionId)}>
                                                <SecondaryButton>
                                                    <Ellipsis />
                                                </SecondaryButton>
                                            </Link>
                                            {
                                                roles.includes('receiver') &&
                                                    (routing.status !== 'Completed' && routing.status !== 'Incomplete') ? (
                                                    <Dropdown>
                                                        <Dropdown.Trigger>
                                                            <SecondaryButton>
                                                                <ChevronDown />
                                                            </SecondaryButton>
                                                        </Dropdown.Trigger>
                                                        <Dropdown.Content>
                                                            <Dropdown.Title>Mark as</Dropdown.Title>
                                                            <Dropdown.Item onClick={() => handleStatusChange('Completed', routing.id)}>Completed</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => handleStatusChange('Incomplete', routing.id)}>Incomplete</Dropdown.Item>
                                                        </Dropdown.Content>
                                                    </Dropdown>
                                                ) : null
                                            }
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
