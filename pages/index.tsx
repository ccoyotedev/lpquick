import React, { useEffect } from 'react';
import { Layout } from 'components/sections/layout';
import { styled } from 'theme';
import { Panel } from 'components/ui';
import { useMoralis } from 'react-moralis';
import { useWeb3 } from 'context/Web3Context';

const Home = () => {
  const { Moralis, isWeb3Enabled, isAuthenticated, user } = useMoralis();
  const { dispatch } = useWeb3();

  const getBalances = async (address: string) => {
    try {
      const options = { chain: 'polygon', address: address, symbol: "DINO" }
      const balances = await Moralis.Web3.getAllERC20(options);

      console.log(options, balances)
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        error: err
      })
    }
  }

  useEffect(() => {
    if (isWeb3Enabled && isAuthenticated) {
      const userAddress = user.attributes.accounts[0];
      getBalances(userAddress);
    }
  }, [isWeb3Enabled, isAuthenticated])

  return (
    <Layout>
      <Panel>
        
      </Panel>
    </Layout>
  )
}

export default Home;