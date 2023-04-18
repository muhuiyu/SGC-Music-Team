import { IconButton } from '@material-ui/core'
import { Check, Close } from '@material-ui/icons'
import produce from 'immer'
import { useMemo, useState } from 'react'
import UserModel, { roleInfo } from '../../../models/User'

interface Props {
  user: UserModel
  editing: boolean
  selected?: boolean
  onUpdateSelection(selected: boolean): void
  onRequestEdit(): void
  onCommitEdit(details: Partial<UserModel>): void
  onCancelEdit(): void
}

export default function MemberListRow(props: Props) {
  const {
    user,
    editing,
    selected = false,
    onUpdateSelection,
    onRequestEdit,
    onCommitEdit,
    onCancelEdit,
  } = props

  const [editingUser, setEditingUser] = useState<Partial<UserModel>>({})

  const resolvedUser = useMemo(
    () => ({
      ...user,
      ...editingUser,
    }),
    [user, editingUser],
  )

  const onEditField =
    (field: 'name' | 'email' | 'phoneNumber') => (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditingUser(
        produce((draft) => {
          draft[field] = e.target.value
        }),
      )
    }

  return (
    <tr key={resolvedUser.email}>
      <td className="relative px-7 sm:w-12 sm:px-6">
        <input
          type="checkbox"
          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          value={resolvedUser.email}
          checked={selected}
          onChange={(e) => onUpdateSelection(e.target.checked)}
        />
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {editing ? (
          <input
            type="text"
            name="name"
            value={resolvedUser.name}
            style={{ backgroundColor: 'lightblue' }}
            onChange={onEditField('name')}
          />
        ) : (
          resolvedUser.name
        )}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex flex-row gap-1">
        {resolvedUser.roles.map((role, index) => (
          <span
            className="inline-flex rounded-full px-2 text-xs font-medium leading-5"
            style={{
              backgroundColor: roleInfo[role].colorCode,
              color: roleInfo[role].textColorCode,
            }}
          >
            {role}
          </span>
          //   <span key={role} className="inline-block px-2 py-0.5 bg-slate-300 rounded-2xl">
          //     {role}
          //     {editing && <Close />}
          //   </span>
        ))}
        {editing && (
          <span
            key="add-role"
            className="inline-flex rounded-full px-2 text-xs font-medium leading-5 bg-slate-300"
          >
            Add role
          </span>
        )}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {editing ? (
          <input
            type="text"
            name="email"
            value={resolvedUser.email}
            style={{ backgroundColor: 'lightblue' }}
            onChange={onEditField('email')}
          />
        ) : (
          resolvedUser.email
        )}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {editing ? (
          <input
            type="text"
            name="phone"
            value={resolvedUser.phoneNumber}
            style={{ backgroundColor: 'lightblue' }}
            onChange={onEditField('phoneNumber')}
          />
        ) : (
          resolvedUser.phoneNumber
        )}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        {editing ? (
          <div className="flex flex-row">
            <IconButton
              aria-label="cancel"
              onClick={() => {
                onCancelEdit()
                setEditingUser({})
              }}
              color="secondary"
            >
              <Close />
            </IconButton>
            <IconButton
              size="small"
              aria-label="save"
              onClick={() => {
                onCommitEdit(editingUser)
                setEditingUser({})
              }}
              color="primary"
            >
              <Check />
            </IconButton>
          </div>
        ) : (
          <a
            onClick={() => {
              onRequestEdit()
            }}
            className="text-primary hover:text-indigo-900"
          >
            Edit<span className="sr-only">, {resolvedUser.name}</span>
          </a>
        )}
      </td>
    </tr>
  )
}
