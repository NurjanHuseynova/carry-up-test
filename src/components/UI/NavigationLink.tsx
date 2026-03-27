import { useEffect, useState } from "react";
import { Link } from "@/navigation";
import { ComponentProps, ReactNode } from "react";

type NavigationLinkProps = ComponentProps<typeof Link> & {
  href: any;
  className: string;
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  style?:any;
  id?:any;
  target?:string
};

export default function NavigationLink({
  href,
  className,
  children,
  target,
  ...rest
}: NavigationLinkProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Link href={href} className={className} prefetch={false} {...rest} target={target ? "_blank" : "_self"}>
      {children}
    </Link>
  );
}
