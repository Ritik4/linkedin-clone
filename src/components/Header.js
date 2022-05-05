import styled from "styled-components";
import React from "react";
import { connect } from "react-redux";
import { auth } from "../firebase";

function Header(props) {
  return (
    <Container>
      <Content>
        <Logo>
          <a href="/home">
            <img src="/images/home-logo.svg" alt="" />
          </a>
        </Logo>
        <Search>
          <SearchIcon>
            <img src="/images/search-icon.svg" alt="" />
          </SearchIcon>
          <input type="text" placeholder="Search" />
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className="active">
              <a>
                <img src="/images/nav-home.svg" alt="" />
                <span>Home</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-network.svg" alt="" />
                <span>My Network</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="/images/nav-jobs.svg" alt="" />
                <span>Jobs</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="/images/nav-messaging.svg" alt="" />
                <span>Messaging</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="/images/nav-notifications.svg" alt="" />
                <span>Notifications</span>
              </a>
            </NavList>

            <User>
              <a>
                {props.user ? (
                  <img src={props.user.photoURL} />
                ) : (
                  <img src="/images/user.svg" />
                )}
                <span>
                  Me <img src="/images/down-icon.svg" />
                </span>
              </a>

              <SignOut onClick={() => auth.signOut()}>
                <a>Sign Out</a>
              </SignOut>
            </User>

            <Work>
              <a>
                <img src="/images/nav-work.svg" />
                <span>
                  Work <img src="/images/down-icon.svg" />
                </span>
              </a>
            </Work>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0 24px;
  left: 0;
  top: 0;
  position: fixed;
  width: 100vw;
  z-index: 100;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  min-height: 100%;
  max-width: 1128px;
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
`;

const Search = styled.div`
  background-color: #eef3f8;
  color: #5f6163;
  display: flex;
  align-items: center;
  border-radius: 2px;

  input {
    border: none;
    box-shadow: none;
    background-color: transparent;
    border: none;
    font-size: 14px;
    width: 280px;
    outline-color: #0a66c2;
    padding-left: 40px;
    height: 34px;
    border-color: #eef3f8;
    vertical-align: text-top;
  }
`;

const SearchIcon = styled.div`
  pointer-events: none;
  position: absolute;
  height: 15px;
  padding: 8px 8px 8px 16px;
`;

const Nav = styled.nav`
  display: block;
  margin-left: auto;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;

  .active {
    span:after {
      content: "";
      border-bottom: 2px solid var(--white, #fff);
      transform: scaleX(1);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  & a {
    align-items: center;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;

    span {
      color: rgba(0, 0, 0, 0.6);
      align-items: center;
      display: flex;
    }

    @media (max-width: 768px) {
      min-width: 70px;
    }
  }

  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 45px;
  background-color: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 167ms;
  text-align: center;
  display: none;
`;

const User = styled(NavList)`
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  &:hover {
    ${SignOut} {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

const mapStateToProps = (state) => {
  return { user: state.userState.user };
};

export default connect(mapStateToProps)(Header);
