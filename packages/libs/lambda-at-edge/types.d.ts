import {
  CloudFrontRequest,
  CloudFrontEvent,
  CloudFrontResponse
} from "aws-lambda";

export type DynamicPageKeyValue = {
  [key: string]: {
    file: string;
    regex: string;
  };
};

export type OriginRequestApiHandlerManifest = {
  apis: {
    dynamic: DynamicPageKeyValue;
    nonDynamic: {
      [key: string]: string;
    };
  };
};

export type OriginRequestDefaultHandlerManifest = {
  buildId: string;
  logLambdaExecutionTimes: boolean;
  pages: {
    ssr: {
      dynamic: DynamicPageKeyValue;
      nonDynamic: {
        [key: string]: string;
      };
    };
    html: {
      nonDynamic: {
        [path: string]: string;
      };
      dynamic: DynamicPageKeyValue;
    };
  };
  publicFiles: {
    [key: string]: string;
  };
  trailingSlash: boolean;
};

export type OriginRequestEvent = {
  Records: [
    { cf: { request: CloudFrontRequest; config: CloudFrontEvent["config"] } }
  ];
};

export type OriginResponseEvent = {
  Records: [
    {
      cf: {
        request: CloudFrontRequest;
        response: CloudFrontResponse;
        config: CloudFrontEvent["config"];
      };
    }
  ];
};

export type PreRenderedManifest = {
  version: 2;
  routes: {
    [route: string]: {
      initialRevalidateSeconds: number | false;
      srcRoute: string | null;
      dataRoute: string;
    };
  };
  dynamicRoutes: {
    [route: string]: {
      routeRegex: string;
      fallback: string | false;
      dataRoute: string;
      dataRouteRegex: string;
    };
  };
  preview: {
    previewModeId: string;
    previewModeSigningKey: string;
    previewModeEncryptionKey: string;
  };
};

export type RoutesManifest = {
  basePath: string;
};

export type PerfLogger = {
  now: () => number | undefined;
  log: (metricDescription: string, t1?: number, t2?: number) => void;
};
