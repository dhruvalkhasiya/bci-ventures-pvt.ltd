import runServerless from "../_runner";

export default async function handler(req: any, res: any) {
  return runServerless(req, res);
}
