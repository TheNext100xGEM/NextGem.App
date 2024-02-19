import { Button, Menu, Corner, Loader } from "@components/ui"
import { SOUND_BUTTON_HOVER, VOLUME_BUTTON_HOVER } from "@constants/index"
import { useAppContext } from "@context/AppContext"
import { ApiUserChats, UserChat, mapUserChat } from "@models/Chat"
import { useMutation, useQuery } from "@tanstack/react-query"
import { filterUsersByDate } from "@utils/date"
import classNames from "classnames"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useSound from "use-sound"
import web3Token from "web3-token"

import { deleteUserChat, getUserChats } from "../../../queries/api"

function GemAiList({opened}: {opened: boolean}) {
  const { chatId } = useParams()

  const [soundHover] = useSound(SOUND_BUTTON_HOVER, {
    volume: VOLUME_BUTTON_HOVER
  })

  const [usersToday, setUsersToday] = useState<UserChat[]>([])
  const [usersLast7Days, setUsersLast7Days] = useState<UserChat[]>([])
  const [usersLast30Days, setUsersLast30Days] = useState<UserChat[]>([])

  const { setIsPremium } = useAppContext()

  const qDeleteUserChat = useMutation({
    mutationFn: deleteUserChat
  })

  const qUserChats = useQuery({
    queryKey: ["userChats", web3Token],
    queryFn: getUserChats,
    select: (data) => {
      if ("data" in data) {
        return (data as ApiUserChats).data.map(mapUserChat)
      }
    },
    refetchOnWindowFocus: false,
    enabled: !!web3Token
  })

  const Item = ({ id, name }: UserChat) => {
    const handleDelete = async () => {
      await qDeleteUserChat.mutateAsync({ chatId: id })
      qUserChats.refetch()
    }
    const actions = [
      // <Button icon='carbon:pen' color='tertiary'>
      //   Rename
      // </Button>,
      <Button
        icon='carbon:trash-can'
        color='secondary'
        status='danger'
        onClick={handleDelete}
      >
        Delete Chat
      </Button>
    ]

    return (
      <>
        <div className='ai-list-item-title'>{name}</div>
        {id !== chatId && <Menu sub={actions} />}
      </>
    )
  }

  useEffect(() => {
    if (!qUserChats.data) return

    const today = filterUsersByDate(qUserChats.data, 1)
    setUsersToday(today)

    const last7Days = filterUsersByDate(qUserChats.data, 7).filter(
      (user) => !today.includes(user)
    )
    setUsersLast7Days(last7Days)

    const last30Days = filterUsersByDate(qUserChats.data, 30).filter(
      (user) => !today.includes(user) && !last7Days.includes(user)
    )
    setUsersLast30Days(last30Days)
  }, [qUserChats.data])

  useEffect(() => {
    setIsPremium(!!qUserChats.data)
  }, [qUserChats.data])

  return (
    <aside className={classNames("ai-list", { opened: opened })}>
      <ul>
        <li className='ai-list-heading'>
          <span>Last conversations</span>
          <Link to='/gem-ai'>
            <Button
              icon='carbon:add-comment'
              minus
              status='success'
              title='New conversation'
            />
          </Link>
        </li>

        {usersLast30Days.length > 0 && (
          <>
            {usersLast30Days.map((conversation, id) => (
              <li
                key={id}
                className={classNames("ai-list-item", {
                  active: chatId === conversation.id
                })}
              >
                <Item {...conversation} />
                <Link
                  to={`/gem-ai/${conversation.id}`}
                  className='ai-list-item-clicker'
                  onMouseEnter={() => soundHover()}
                />
                <Corner
                  color={chatId === conversation.id ? "primary" : "tertiary"}
                />
              </li>
            ))}
            <li className='ai-list-subheading'>Last 30 days</li>
          </>
        )}
        {usersLast7Days.length > 0 && (
          <>
            {usersLast7Days.map((conversation, id) => (
              <li
                key={id}
                className={classNames("ai-list-item", {
                  active: chatId === conversation.id
                })}
              >
                <Item {...conversation} />
                <Link
                  to={`/gem-ai/${conversation.id}`}
                  className='ai-list-item-clicker'
                  onMouseEnter={() => soundHover()}
                />
                <Corner
                  color={chatId === conversation.id ? "primary" : "tertiary"}
                />
              </li>
            ))}
            <li className='ai-list-subheading'>Last 7 days</li>
          </>
        )}
        {usersToday.length > 0 && (
          <>
            {usersToday.map((conversation, id) => (
              <li
                key={id}
                className={classNames("ai-list-item", {
                  active: chatId === conversation.id
                })}
              >
                <Item {...conversation} />
                <Link
                  to={`/gem-ai/${conversation.id}`}
                  className='ai-list-item-clicker'
                  onMouseEnter={() => soundHover()}
                />
                <Corner
                  color={chatId === conversation.id ? "primary" : "tertiary"}
                />
              </li>
            ))}
            <li className='ai-list-subheading'>Today</li>
          </>
        )}
        {!qUserChats.data && !qUserChats.isFetched && (
          <li className='ai-list-loader'>
            <Loader />
          </li>
        )}
      </ul>
    </aside>
  )
}

export default GemAiList
