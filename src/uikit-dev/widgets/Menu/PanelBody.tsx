import useTheme from 'hooks/useTheme'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
// import SwitchNetwork from 'uikit-dev/components/SwitchNetwork'
import { Text } from '../../components/Text'
import logoDesktop from '../../images/mobile_logo.svg'
import logoWhite from '../../images/logo2.svg'
import { Login } from '../WalletModal/types'
import Accordion from './Accordion'
import { LinkLabel, MenuEntry } from './MenuEntry'
import MenuLink from './MenuLink'
import { PanelProps, PushedProps } from './types'
import UserBlock from './UserBlock'
import CopyToClipboard from '../WalletModal/CopyToClipboard'
import NeobitCoin from '../../images/logo.svg'

interface Props extends PanelProps, PushedProps {
  isMobile: boolean
  account?: string
  login: Login
  logout: () => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  padding: 4px 12px 12px 12px;
`

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  justify-content: center;
  margin-bottom: 16px;

  img {
    height: 14px;
  }

  ${({ theme }) => theme.mediaQueries.nav} {
    img {
      height: 24px;
    }
  }
`

const StyleLight = styled.div`
  position: relative;
  padding: 10px;
  margin: 10px 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 2px; /* control the border thickness */
    background: linear-gradient(to right, orange, red, blue);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    pointer-events: none;
  }
`

const StyledDark = styled.div`
  position: relative;
  padding: 10px;
  margin: 10px 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 2px; /* control the border thickness */
    background: linear-gradient(to right, orange, red, blue);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    pointer-events: none;
  }
`

const PanelBody: React.FC<Props> = (props) => {
  const location = useLocation()
  const { isDark } = useTheme()
  const { isPushed, pushNav, isMobile, links, account, login, logout, currentLang } = props

  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined

  const MenuItem = ({ menu }) => {
    const calloutClass = menu.calloutClass ? menu.calloutClass : undefined
    const isActive = location.pathname === menu.href && !menu.notHighlight

    if (menu.items) {
      const itemsMatchIndex = menu.items.findIndex((item) => item.href === location.pathname)
      const initialOpenState = menu.initialOpenState === true ? menu.initialOpenState : itemsMatchIndex >= 0

      return (
        <Accordion
          key={menu.label}
          isPushed={isPushed}
          pushNav={pushNav}
          icon={<img src={isDark ? menu.iconActive : menu.icon} alt="" width="24" className="mr-3" />}
          label={menu.label}
          initialOpenState={initialOpenState}
          className={calloutClass}
        >
          {isPushed &&
            menu.items.map((item) => (
              <MenuEntry
                key={item.label}
                isActive={item.href === location.pathname && !item.notHighlight}
                className={calloutClass}
                style={{ border: 'none' }}
              >
                <MenuLink
                  href={item.customHref ? (item.customHref || {})[(currentLang || '').toLowerCase()] : item.href}
                  onClick={handleClick}
                  target={item.newTab ? '_blank' : ''}
                  style={{ paddingLeft: '40px' }}
                >
                  <LinkLabel isPushed={isPushed}>{item.label}</LinkLabel>
                </MenuLink>
              </MenuEntry>
            ))}
        </Accordion>
      )
    }

    return (
      <MenuEntry key={menu.label} isActive={isActive} className={calloutClass}>
        <MenuLink href={menu.href} onClick={handleClick} target={menu.newTab ? '_blank' : ''}>
          <img src={isActive || isDark ? menu.iconActive : menu.icon} alt="" width="24" className="mr-3" />
          <LinkLabel isPushed={isPushed}>{menu.label}</LinkLabel>
        </MenuLink>
      </MenuEntry>
    )
  }

  const addressFinix = '0x0b4D95fd2F9b6B1d2d3F0d65990597EE483264B1'
  const addressEllipsis = addressFinix
    ? `${addressFinix.substring(0, 6)}...${addressFinix.substring(addressFinix.length - 4)}`
    : null
  return (
    <Container>
      {isMobile && (
        <div className="bd-b py-4">
          <StyledLink as="a" href="/" aria-label="Definix home page">
            <img src={isDark ? logoWhite : logoDesktop} alt="" />
          </StyledLink>

          {/* <SwitchNetwork /> */}
          <UserBlock account={account} login={login} logout={logout} className="mt-2 dis-in-block" />
        </div>
      )}

      {links.map((link) => (
        <div className="py-2 bd-b">
          <MenuItem menu={link} key={link.label} />
        </div>
      ))}

      {isDark ? (
        <StyledDark>
          <img src={NeobitCoin} alt="NeobitCoin" width="22" />
          <Text className="pl-1" color="text" fontSize="14px">
            NBIT
          </Text>
          <Text className="px-1" fontSize="14px">
            {addressEllipsis}
          </Text>
          <CopyToClipboard color="#FFF" noText toCopy={addressFinix} tooltipPos="bottom" iconWidth="16px" />
        </StyledDark>
      ) : (
        <StyleLight>
          <img src={NeobitCoin} alt="NeobitCoin" width="22" />
          <Text className="pl-1" color="text" fontSize="14px">
            NBIT
          </Text>
          <Text className="px-1" fontSize="14px">
            {addressEllipsis}
          </Text>
          <CopyToClipboard color="#000" noText toCopy={addressFinix} tooltipPos="bottom" iconWidth="16px" />
        </StyleLight>
      )}
    </Container>
  )
}

export default PanelBody
