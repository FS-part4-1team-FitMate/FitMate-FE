import { GetServerSideProps } from "next";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  filter?: string;
}

interface PageProps {
  initialQuery: QueryParams;
}

// 초기 로딩시 router.query 도 빈 JSON 객체이고, useSearchParams() 도 빈 JSON 객체이기 때문에 getServerSideProps 에서 초기값을 설정해 주어야 함.
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const { page = 1, limit = 10, search = "", filter = "" } = context.query;

  return {
    props: {
      initialQuery: {
        page: Number(page),
        limit: Number(limit),
        search: search as string,
        filter: filter as string,
      },
    },
  };
};

function QueryParamsTest({ initialQuery }: PageProps) {
  const router = useRouter();
  const { query } = router;
  console.log("query", query);
  const [page, setPage] = useState(Number(initialQuery.page) || 1);
  const [limit, setLimit] = useState(Number(initialQuery.limit) || 10);
  const [search, setSearch] = useState((initialQuery.search as string) || "");
  const [filter, setFilter] = useState((initialQuery.filter as string) || "");

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { page, limit, search, filter },
    });
  }, [page, limit, search, filter]);

  useEffect(() => {
    setPage(Number(query.page) || 1);
    setLimit(Number(query.limit) || 10);
    setSearch((query.search as string) || "");
    setFilter((query.filter as string) || "");
  }, [query]);

  return (
    <div>
      <h1 className="text-2lg">Query Params Test</h1>
      <p className="text-lg m-4">page: {page}</p>
      <p className="text-lg m-4">limit: {limit}</p>
      <p className="text-lg m-4">search: {search}</p>
      <p className="text-lg m-4">filter: {filter}</p>
      <button
        className="text-lg inline-block bg-blue-700 text-white m-4 p-4"
        onClick={() => setPage(page + 1)}
      >
        Next Page
      </button>
      <button
        className="text-lg inline-block bg-blue-700 text-white m-4 p-4"
        onClick={() => setLimit(limit + 10)}
      >
        Increase Limit
      </button>
      <button
        className="text-lg inline-block bg-blue-700 text-white m-4 p-4"
        onClick={() => setSearch("search")}
      >
        Search
      </button>
      <button
        className="text-lg inline-block bg-blue-700 text-white m-4 p-4"
        onClick={() => setFilter("filter")}
      >
        Filter
      </button>
    </div>
  );
}

export default QueryParamsTest;
