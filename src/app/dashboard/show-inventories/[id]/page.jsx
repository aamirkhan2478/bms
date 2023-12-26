"use client";
import CustomBox from "@/components/CustomBox";
import Layout from "@/components/Layout";
import { useShowInventory } from "@/hooks/useInventory";
import { useParams } from "next/navigation";
import React from "react";

const ShowInventory = () => {
  const { id } = useParams();
  const { data, isLoading } = useShowInventory(id);

  return (
    <Layout>
      <CustomBox
        heading={`${data?.data?.data.inventory?.inventoryType} - ${data?.data?.data.inventory?.floor}${data?.data?.data.inventory?.flatNo}`}
        maxW={800}
      >
        <h1>Show Inventory</h1>
      </CustomBox>
    </Layout>
  );
};

export default ShowInventory;
